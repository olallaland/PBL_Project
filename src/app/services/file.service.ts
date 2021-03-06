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
export class FileService {

  // private serviceUrl = 'http://localhost:8089';
  private readonly serviceUrl;

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
  }

  /**
   * 根据courseID和projectID获取某个项目下的文件列表
   * @parameter courseID
   * @parameter projectID
   */
  getFileList(courseID, projectID) {
    const data = {
      course_id: courseID,
      pj_id: projectID
    };
    return this.http.post(this.serviceUrl + '/pbl/file/getFiles/' + courseID + '/' + projectID, httpOptions);
  }

  /**
   * 用户上传文件（老师和学生）
   * @parameter data
   */
  uploadFile(data) {
    return this.http.post(this.serviceUrl + '/pbl/file/upload', data);
  }

  /**
   * 用户删除文件（文件上传者或老师）
   * @parameter fileID
   */
  deleteFile(fileID) {
    return this.http.post(this.serviceUrl + '/pbl/file/deleteFile/' + fileID, httpOptions);
  }
}
