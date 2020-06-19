import {Inject, Injectable} from '@angular/core';
import {SessionService} from './session.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseList = [];
  private readonly serviceUrl;
  // private serviceUrl = 'http://localhost:8089';

  constructor(
    private sessionService: SessionService,
    public http: HttpClient,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
  }

  /**
   * 根据教师/学生ID获取他们teach/take的课
   */
  getCourseList() {
    const type = this.sessionService.get('userIdentity');
    const id = this.sessionService.get('userID');

    return this.http.get(this.serviceUrl + '/pbl/course/getCourses?type=' + type + '&username=' + id);
  }

  /**
   * 获取所有课程
   */
  getAllCourse() {
    const type = 'root';
    const id = 'root';

    return this.http.get(this.serviceUrl + '/pbl/course/getCourses?type=' + type + '&username=' + id);
  }

  /**
   * 根据课程ID获取课程信息
   * @parameter courseID
   */
  getCourseByID(courseID) {
    return this.http.get(this.serviceUrl + '/pbl/course/getCourse?course_id=' + courseID);
  }

  /**
   * 学生加入课程
   * @parameter courseID
   * @parameter studentID
   */
  joinCourse(courseID, studentID) {
    return this.http.get(this.serviceUrl + '/pbl/course/joinCourse?course_id=' + courseID + '&username=' + studentID);
  }

  /**
   * 返回所有选课学生列表
   * @parameter courseID
   */
  getCourseRoster(courseID) {
    return this.http.post(this.serviceUrl + '/pbl/course/getCourseRoster/' + courseID, httpOptions);
  }

  /**
   * 删除课程（教师或者管理员）
   * @parameter courseID
   */
  deleteCourse(courseID) {
    return this.http.post(this.serviceUrl + '/pbl/course/removeCourse?course_id=' + courseID, httpOptions);
  }

  /**
   * 创建课程（教师或者管理员）
   * @parameter courseData
   */
  createCourse(courseData) {
    return this.http.post(this.serviceUrl + '/pbl/course/addCourse', courseData, httpOptions);
  }

}
