import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';

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
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
      name: '',
      gender: '',
      picture: ''
    });
  }

  ngOnInit(): void {
    // 限制已登录的用户打开本页面
    if (this.sessionService.get('user') != null) {
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

  onSubmit(value: any) {
    console.log('submit');
  }

}
