import {Injectable} from '@angular/core';
import {SessionService} from './session.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseList = [];
  // private serviceUrl = 'http://3.94.89.139:8080';
  private serviceUrl = 'http://localhost:8089';

  constructor(
    private sessionService: SessionService,
    public http: HttpClient,
  ) {
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

  }

  /**
   * 删除课程（教师或者管理员）
   * @parameter courseID
   */
  deleteCourse(courseID) {

  }

  /**
   * 创建课程（教师或者管理员）
   * @parameter courseData
   */
  createCourse(courseData) {

  }

}
