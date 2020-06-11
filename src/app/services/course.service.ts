import { Injectable } from '@angular/core';
import {SessionService} from './session.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseList = [];
  private serviceUrl = 'http://localhost:8080';
  constructor(
    private sessionService: SessionService,
    public http: HttpClient,
  ) { }

  getCourseList1(type, id) {
    this.courseList = [
      {
        course_id: '001',
        teacher_name: 'Mary',
        name: 'Advanced Web',
        course_time: '2020春',
        exam_time: '2020-06-24',
        desc: '本课程从重要的Web核心协议开始，沿着web发展的阶段脉络清晰的介绍其相关概念、技术和应用。围绕前后端分离架构，重点介绍以下现代Web技术：\n' +
          '1）Web的核心协议，架构演变和关键应用技术，如Web2.0相关技术。包括最新的HTML5协议；应用Web的架构演变和重要技术概述；以及典型Web应用开发框架。Web与云计算技术等。\n' +
          '2）Web数据基础与Web3D，包括XML的相关技术和WebGL(Three.js)。\n' +
          '3） 前后端分离架构下的流行Web框架，包括前端js框架Angular和后端Java EE框架SpringMVC/SpringBoot, MyBatis。\n' +
          '4) 连接前后端的Web Services技术。 \n' +
          '5） 了解其他前沿和流行web技术简介和促进学生主动学习，包括微服务和容器技术，移动Web开发（Ionic），Web3.0的相关技术如语义web等。',
        amount: 20
      },
      {
        course_id: '002',
        teacher_name: 'Mary',
        name: 'Advanced Web',
        course_time: '2020春',
        exam_time: '2020-06-24',
        desc: '本课程从重要的Web核心协议开始，沿着web发展的阶段脉络清晰的介绍其相关概念、技术和应用。围绕前后端分离架构，重点介绍以下现代Web技术：\n' +
          '1）Web的核心协议，架构演变和关键应用技术，如Web2.0相关技术。包括最新的HTML5协议；应用Web的架构演变和重要技术概述；以及典型Web应用开发框架。Web与云计算技术等。\n' +
          '2）Web数据基础与Web3D，包括XML的相关技术和WebGL(Three.js)。\n' +
          '3） 前后端分离架构下的流行Web框架，包括前端js框架Angular和后端Java EE框架SpringMVC/SpringBoot, MyBatis。\n' +
          '4) 连接前后端的Web Services技术。 \n' +
          '5） 了解其他前沿和流行web技术简介和促进学生主动学习，包括微服务和容器技术，移动Web开发（Ionic），Web3.0的相关技术如语义web等。',
        amount: 20
      },
      {
        course_id: '003',
        teacher_name: 'Mary',
        name: 'Advanced Web',
        course_time: '2020春',
        exam_time: '2020-06-24',
        desc: '本课程从重要的Web核心协议开始，沿着web发展的阶段脉络清晰的介绍其相关概念、技术和应用。围绕前后端分离架构，重点介绍以下现代Web技术：\n' +
          '1）Web的核心协议，架构演变和关键应用技术，如Web2.0相关技术。包括最新的HTML5协议；应用Web的架构演变和重要技术概述；以及典型Web应用开发框架。Web与云计算技术等。\n' +
          '2）Web数据基础与Web3D，包括XML的相关技术和WebGL(Three.js)。\n' +
          '3） 前后端分离架构下的流行Web框架，包括前端js框架Angular和后端Java EE框架SpringMVC/SpringBoot, MyBatis。\n' +
          '4) 连接前后端的Web Services技术。 \n' +
          '5） 了解其他前沿和流行web技术简介和促进学生主动学习，包括微服务和容器技术，移动Web开发（Ionic），Web3.0的相关技术如语义web等。',
        amount: 20
      },
      {
        course_id: '004',
        teacher_name: 'Mary',
        name: 'Advanced Web',
        course_time: '2020春',
        exam_time: '2020-06-24',
        desc: '本课程从重要的Web核心协议开始，沿着web发展的阶段脉络清晰的介绍其相关概念、技术和应用。围绕前后端分离架构，重点介绍以下现代Web技术：\n' +
          '1）Web的核心协议，架构演变和关键应用技术，如Web2.0相关技术。包括最新的HTML5协议；应用Web的架构演变和重要技术概述；以及典型Web应用开发框架。Web与云计算技术等。\n' +
          '2）Web数据基础与Web3D，包括XML的相关技术和WebGL(Three.js)。\n' +
          '3） 前后端分离架构下的流行Web框架，包括前端js框架Angular和后端Java EE框架SpringMVC/SpringBoot, MyBatis。\n' +
          '4) 连接前后端的Web Services技术。 \n' +
          '5） 了解其他前沿和流行web技术简介和促进学生主动学习，包括微服务和容器技术，移动Web开发（Ionic），Web3.0的相关技术如语义web等。',
        amount: 20
      },
      {
        course_id: '005',
        teacher_name: 'Mary',
        name: 'Advanced Web',
        course_time: '2020春',
        exam_time: '2020-06-24',
        desc: '本课程从重要的Web核心协议开始，沿着web发展的阶段脉络清晰的介绍其相关概念、技术和应用。围绕前后端分离架构，重点介绍以下现代Web技术：\n' +
          '1）Web的核心协议，架构演变和关键应用技术，如Web2.0相关技术。包括最新的HTML5协议；应用Web的架构演变和重要技术概述；以及典型Web应用开发框架。Web与云计算技术等。\n' +
          '2）Web数据基础与Web3D，包括XML的相关技术和WebGL(Three.js)。\n' +
          '3） 前后端分离架构下的流行Web框架，包括前端js框架Angular和后端Java EE框架SpringMVC/SpringBoot, MyBatis。\n' +
          '4) 连接前后端的Web Services技术。 \n' +
          '5） 了解其他前沿和流行web技术简介和促进学生主动学习，包括微服务和容器技术，移动Web开发（Ionic），Web3.0的相关技术如语义web等。',
        amount: 20
      }
    ];

    return this.courseList;
  }

  getCourseList() {
    const type = this.sessionService.get('userIdentity');
    const id = this.sessionService.get('userID');

    return this.http.get(this.serviceUrl + '/pbl/course/getCourse/' + type + '/' + id);
  }

  getCourseByID(courseID) {
    return this.http.get(this.serviceUrl + '/pbl/course/getCourseByID/' + courseID);
  }

}
