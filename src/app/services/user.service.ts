import { Injectable } from '@angular/core';
import {UserInfo} from '../entities/UserInfo';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionService} from './session.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  singleUser: UserInfo;

  private serviceUrl = 'http://localhost:8080';

  private studentSample: UserInfo = new UserInfo(200, 'suecess', 1,
    'student', '17302010083', 'password', 'lty', 'female', null);

  constructor(
    public http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) { }

  /**
   * 登录判断
   * @parameter userData
   */
  login(userData) {
    this.http.post(this.serviceUrl + '/pbl/user/login', userData, httpOptions).subscribe((response: UserInfo) => {
      console.log(response);
      if (response.code === 200) {
        this.sessionService.put('userIdentity', userData.type);
        this.sessionService.put('user', userData.username);
        this.sessionService.put('userID', response.id);
        console.log(response.message);
        console.log(response.id);
        // 登录成功，跳转到用户个人页面
        this.router.navigate(['/user/profile', response.id]);
      } else {
        console.log(response.code);
      }
    }, (err) => {
      console.log(err);
    });
  }

  getSingleUser(userID){
    return this.http.get(this.serviceUrl + '/pbl/user/getSingleUser/' + userID);
  }
}
