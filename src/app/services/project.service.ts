import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectList = [];
  taskList = [];
  private readonly serviceUrl;
  // private serviceUrl = 'http://localhost:8089';

  constructor(
    public http: HttpClient,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
  }

  /**
   * 根据courseID获取该门课程下所有项目信息
   * @parameter courseID
   */
  getProjectList(courseID) {
    return this.http.post(this.serviceUrl + '/pbl/project/getPjList/' + courseID, httpOptions);
  }

  /**
   * 根据courseID和projectID获取某个项目的信息
   * @parameter courseID
   * @parameter projectID
   */
  getProjectInfo(courseID, projectID) {
    const data = {
      course_id: courseID,
      pj_id: projectID
    };
    return this.http.post(this.serviceUrl + '/pbl/project/getPj', data, httpOptions);
  }

  /**
   * 创建新项目
   * @parameter projectData
   */
  createProject(projectData) {
    return this.http.post(this.serviceUrl + '/pbl/project/addPj', projectData, httpOptions);
  }

  /**
   * 更新项目信息
   * @parameter projectData
   */
  updateProject(projectData) {
    return this.http.post(this.serviceUrl + '/pbl/project/updatePj', projectData, httpOptions);
  }

  /**
   * 删除项目
   * @parameter courseID
   * @parameter projectID
   */
  deleteProject(courseID, projectID) {
    const data = {
      course_id: courseID,
      pj_id: projectID
    };
    return this.http.post(this.serviceUrl + '/pbl/project/removePj', data, httpOptions);
  }

  /**
   * 学生加入项目
   * @parameter studentID
   * @parameter courseID
   * @parameter projectID
   */
  joinProject(courseID, projectID, studentID) {
    return this.http.post(this.serviceUrl + '/pbl/project/joinPj/' + courseID + '/' + projectID + '/' + studentID, httpOptions);
  }

  /**
   * 获取该项目下的所有人员
   * @parameter courseID
   * @parameter projectID
   */
  getProjectMembers(courseID, projectID) {
    return this.http.post(this.serviceUrl + '/pbl/project/getPjMembers/' + courseID + '/' + projectID, httpOptions);
  }

  /**
   * 获得student项目得分
   * @parameter courseID
   * @parameter projectID
   * @parameter studentID
   */
  getStudentScore(courseID, projectID, studentID) {
    return this.http.post(this.serviceUrl + '/pbl/project/getStudentScore/' + courseID + '/' + projectID + '/' + studentID, httpOptions);
  }

  /**
   * 老师为学生评分
   * @parameter data
   */
  scoreStudent(data) {
    return this.http.post(this.serviceUrl + '/pbl/project/scoreStudent', data, httpOptions);
  }
}
