import {Injectable} from '@angular/core';
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

  private serviceUrl = 'http://localhost:8089';

  constructor(
    private http: HttpClient
  ) {
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
    return this.http.post(this.serviceUrl + '/pbl/discussion/getDiscussion' + courseID, data, httpOptions);
  }

  /**
   * 新建主题讨论
   * @parameter data
   */
  createDiscussion(data) {

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

  }
}
