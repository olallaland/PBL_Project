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
export class DiscussionService {

  private readonly serviceUrl;

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
  }

  /**
   * 根据courseID和projectID获取该项目下的讨论信息
   * @parameter courseID
   * @parameter projectID
   */
  getDiscussionList(courseID, projectID) {
    const data = {
      course_id: courseID,
      pj_id: projectID
    };
    return this.http.post(this.serviceUrl + '/pbl/discussion/getDiscussionList/' + courseID + '/' + projectID, httpOptions);
  }

  /**
   * 新建主题讨论
   * @parameter data
   */
  createDiscussion(data) {
    return this.http.post(this.serviceUrl + '/pbl/discussion/addDiscussion', data, httpOptions);
  }

  /**
   * 获得某个讨论主题下的所有回复
   * @parameter disscussionID
   */
  getAnswerList(discussionID) {
    const data = {
      discussion_id: discussionID
    };
    return this.http.post(this.serviceUrl + '/pbl/discussion/getAnswer', data, httpOptions);
  }

  /**
   * 用户对某个主题讨论进行回复
   * @parameter data
   */
  addAnswer(data) {
    return this.http.post(this.serviceUrl + '/pbl/discussion/addAnswer', data, httpOptions);
  }
}
