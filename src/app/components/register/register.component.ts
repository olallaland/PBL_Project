import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {RResponse} from '../../entities/RResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;
  picture;
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
  ) {
    this.registerForm = this.formBuilder.group({
      type: 'student',
      username: '',
      password: '',
      name: '',
      gender: null,
      picture: null
    });
  }

  ngOnInit(): void {
    // 限制已登录的用户打开本页面
    if (this.sessionService.get('userID') != null) {
      this.router.navigate(['course/list']);
    }
  }

  preview(event) {
    let file;
    if (event.target.files[0]) {
      // tslint:disable-next-line:no-shadowed-variable
      file = event.target.files[0];
      console.log(file);
      console.log('file.size = ' + file.size);
     // obj.file = file;
    }
    this.picture = file;

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
    this.userService.register(userData).subscribe((response: RResponse) => {
      // 根据后端返回的状态码确定用户登录是否成功
      if (response.code === 200) {
        // 注册成功，弹出提示框
        this.toastrService.success('注册成功', '', {
          timeOut: 1500,
        });
        // 登录成功，跳转到用户个人页面
        this.router.navigate(['/user/login']);

      } else {
        // 注册失败，弹出提示框
        this.toastrService.error(response.msg, '注册失败', {
          timeOut: 2000,
        });
        console.log(response.code);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
