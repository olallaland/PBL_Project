import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
      type: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(userData) {
    // tslint:disable-next-line:triple-equals
    if (userData.type == '' || userData.username == '' || userData.password == '') {
      console.log('none');
      return;
    }
    console.log(userData);
    this.sessionService.put('userIdentity', userData.type);
    this.sessionService.put('user', userData.username);
  }
}
