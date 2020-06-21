import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {RResponse} from '../../entities/RResponse';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm;
  picture: File = null;
  imgSrc;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
    private http: HttpClient
  ) {
    this.addUserForm = this.formBuilder.group({
      type: '',
      username: '',
      password: '',
      name: '',
      gender: null,
      picture: null
    });
  }

  ngOnInit(): void {
    // 限制非管理员打开本页面
    if (this.sessionService.get('userIdentity') !== 'admin') {
      this.router.navigate(['user/login']);
    }
  }

  preview(event) {

    this.picture = event.srcElement.files[0]; // 获取图片这里只操作一张图片
    this.imgSrc = window.URL.createObjectURL(this.picture); // 获取上传的图片临时路径

    let file;
    if (event.target.files[0]) {
      // tslint:disable-next-line:no-shadowed-variable
      file = event.target.files[0];
      console.log(file);
      console.log('file.size = ' + file.size);
      // obj.file = file;
    }

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

  onSubmit(userData: any) {
    const formData = new FormData();
    formData.append('type', userData.type);
    formData.append('username', userData.username);
    formData.append('password', userData.password);
    formData.append('name', userData.name);
    formData.append('gender', userData.gender);
    formData.append('picture', this.picture);

    // console.log(formData);

    this.userService.register(formData).subscribe((response: RResponse) => {
      // 根据后端返回的状态码确定用户注册是否成功
      if (response.code === 200) {
        // 注册成功，弹出提示框
        this.toastrService.success('添加用户成功', '', {
          timeOut: 1500,
        });
        // 登录成功，跳转到用户管理页面
        this.router.navigate(['/user-management']);

      } else {
        // 注册失败，弹出提示框
        this.toastrService.error(response.msg, '添加用户失败', {
          timeOut: 1500,
        });
      }
    }, (err) => {
      console.log(err);
    });
  }
}
