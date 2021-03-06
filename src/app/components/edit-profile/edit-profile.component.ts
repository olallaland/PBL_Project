import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SessionService} from '../../services/session.service';
import {RResponse} from '../../entities/RResponse';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userID;
  user;
  editUserInfoForm;
  serviceUrl;
  picture: File = null;
  imgSrc;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private sessionService: SessionService,
    private router: Router,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
  }

  ngOnInit(): void {
    // 限制只能已登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    // 获得url中的 user ID
    this.activatedRoute.params.subscribe((data) => {
      // console.log(data);
      this.userID = data.userID;
    });

    // console.log(this.userID);

    // 获得user信息
    this.userService.getSingleUser(this.userID).subscribe( (res: RResponse) => {
      this.user = res.data;
    });

    // init form
    this.initForm();
  }

  onSubmit(userData) {
    const formData = new FormData();
    formData.append('type', this.sessionService.get('userIdentity'));
    formData.append('username', this.userID);
    formData.append('password', userData.password);
    formData.append('name', userData.name);
    formData.append('gender', userData.gender);
    formData.append('picture', this.picture);

    // console.log(formData);

    this.userService.updateUser(formData).subscribe((response: RResponse) => {
      // 根据后端返回的状态码确定用户登录是否成功
      if (response.code === 200) {
        // 注册成功，弹出提示框
        this.toastrService.success('修改成功', '', {
          timeOut: 1500,
        });

        // 更新session信息
        this.sessionService.put('pwd', response.data.password);
        // 登录成功，跳转到用户个人页面
        this.router.navigate(['/user/profile', this.sessionService.get('userID')]);

      } else {
        // 注册失败，弹出提示框
        this.toastrService.error(response.msg, '修改失败', {
          timeOut: 1500,
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  initForm() {
    this.editUserInfoForm = this.formBuilder.group({
      username: this.sessionService.get('userID'),
      password: '',
      name: '',
      gender: null,
      picture: null,
      type: this.sessionService.get('userIdentity'),
    });
  }

  // preview selected picture
  preview(event) {

    this.picture = event.srcElement.files[0]; // 获取图片这里只操作一张图片
    // this.imgSrc = window.URL.createObjectURL(this.picture); // 获取上传的图片临时路径

    let file;
    if (event.target.files[0]) {
      // tslint:disable-next-line:no-shadowed-variable
      file = event.target.files[0];
      console.log(file);
      console.log('file.size = ' + file.size);
      // obj.file = file;
    }
    this.user.picture = file;

    // file.size 单位为byte
    const reader = new FileReader();
    // 读取文件过程方法
    // tslint:disable-next-line:only-arrow-functions
    reader.onloadstart = function(e) {
      console.log('开始读取....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onprogress = function(e) {
      console.log('正在读取中....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onabort = function(e) {
      console.log('中断读取....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onerror = function(e) {
      console.log('读取异常....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = function(e) {
      console.log('成功读取....');

      const img = document.getElementById('imgPreview');
      if (typeof e.target.result === 'string') {
        img.setAttribute('src', e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }

}
