import {Inject, Injectable} from '@angular/core';
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

  // private serviceUrl = 'http://localhost:8089';

  private readonly serviceUrl;

  constructor(
    public http: HttpClient,
    private router: Router,
    private sessionService: SessionService,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
  }

  /**
   * 将登录数据发送给后端并返回response
   * @parameter userData
   */
  login(userData) {

    console.log(this.serviceUrl + '/pbl/user/login?type=' + userData.type + '&username='
      + userData.user_id + '&password=' + userData.password);
    return this.http.get(this.serviceUrl + '/pbl/user/login?type=' + userData.type + '&username='
      + userData.user_id + '&password=' + userData.password);
    // return this.http.post(this.serviceUrl + '/pbl/user/login', userData, httpOptions);
  }

  /**
   * 将注册信息发送给后端并返回response
   * @parameter userData
   */
  register(userData) {
    return this.http.post(this.serviceUrl + '/pbl/user/register', userData);
    // return this.http.post(this.serviceUrl + '/pbl/file/test', userData);
  }

  /**
   * 根据ID返回user信息
   * @parameter userID
   */
  getSingleUser(userID) {
    const type = this.sessionService.get('userIdentity');
    const id = this.sessionService.get('userID');
    const pwd = this.sessionService.get('pwd');

    return this.http.get(this.serviceUrl + '/pbl/user/login?type=' + type + '&username=' + id + '&password=' + pwd);
    // return this.http.get(this.serviceUrl + '/pbl/user/getSingleUser/' + userID);
  }

  /**
   * 更新user的信息
   * @parameter data
   */
  updateUser(data) {
    console.log('update data: ' + data);
    return this.http.post(this.serviceUrl + '/pbl/user/infoManagement', data);
  }

  /**
   * 获取教师列表
   */
  getTeacherList() {
    return this.http.post(this.serviceUrl + '/pbl/user/getTeachers', httpOptions);
  }
}
