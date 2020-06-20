import {Inject, Injectable} from '@angular/core';
import {SessionService} from './session.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly serviceUrl;

  constructor(
    private sessionService: SessionService,
    public http: HttpClient,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
  }

  /**
   * 获取所有用户
   */
  getAllStudents() {
    return this.http.get(this.serviceUrl + '/pbl/user/getUsers');
  }

  getAllTeachers(){
    return this.http.get(this.serviceUrl + '/pbl/user/getTeachers');
  }

  /**
   * 根据username获取用户信息
   * @parameter username
   */
  getUser(type, username) {
    return this.http.get(this.serviceUrl + '/pbl/user/login?type=' + type + '&username=' + username);
  }

  /**
   * 删除用户
   * @parameter username
   */
  deleteUser(type, username) {
    return this.http.get(this.serviceUrl + '/pbl/user/removeUser?type=' + type + '&username=' + username);
  }

  /**
   * 创建用户（教师或者学生）
   * @parameter userData
   */
  createUser(userData) {
    return this.http.post(this.serviceUrl + '/pbl/user/register', userData);
  }


}
