import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('user') != null) {
      this.router.navigate(['course/list']);
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
      type: ''
    });
  }

  onSubmit(userData) {
    // 提交空的表单
    // tslint:disable-next-line:triple-equals
    if (userData.type == '' || userData.username == '' || userData.password == '') {
      // console.log('none');
      return;
    }

    // tslint:disable-next-line:triple-equals
    if (userData.type == 'admin') {
      // tslint:disable-next-line:triple-equals
      if (userData.username != 'admin' || userData.password != '123456') {
        this.toastrService.warning('用户名或密码不正确', '登录失败');
      } else {
        console.log('gg');
        this.toastrService.success('登录成功', '',{
          timeOut: 1000,
        });
        this.router.navigate(['user/profile']);
      }
    } else {

    }

    this.sessionService.put('userIdentity', userData.type);
    this.sessionService.put('user', userData.username);
  }
}
