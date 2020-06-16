import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private serviceUrl = 'http://localhost:8089';
  constructor(
    private http: HttpClient
  ) { }

  /**
   * 根据课程ID和项目ID获取该项目下的所有任务
   * @parameter courseID
   * @parameter projectID
   */
  getTaskList(courseID, projectID) {
    return this.http.get(this.serviceUrl + '/pbl/mission/getTasks/' + courseID + '/' + projectID);
  }

  /**
   * 根据课程ID、项目ID和学生ID获取该学生在该项目下的负责的所有任务
   * @parameter courseID
   * @parameter projectID
   * @parameter studentID
   */
  getStudentTasks(courseID, projectID, studentID) {

  }

  /**
   * 新建任务
   * @parameter taskData
   */
  createTask(taskData) {
    return this.http.post(this.serviceUrl + '/pbl/mission/addMission', taskData, httpOptions);
  }

  /**
   * 更新任务信息（通常是某个同学完成了任务）
   * @parameter taskData
   */
  updateTask(taskData) {
    return this.http.post(this.serviceUrl + '/pbl/mission/updateMission', taskData, httpOptions);
  }
}
