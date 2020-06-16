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
export class ProjectService {

  projectList = [];
  taskList = [];
  // private serviceUrl = 'http://3.94.89.139:8080';
  private serviceUrl = 'http://localhost:8089';

  constructor(
    public http: HttpClient,
  ) {
  }

  getProjectList1(courseID) {
    this.projectList = [
      {
        pj_id: '001',
        name: 'Unity开发基础 — Project 1：多米诺骨牌 上',
        start_time: '2020-04-24',
        end_time: '2020-06-24',
        desc: '大家好，欢迎进入第二周的学习！从本周起，我们将开始本门课程3D手机游戏项目—《慕课英雄》（MOOC HERO）的制作。' +
          ' 在本周，我们学习制作一个《多米诺骨牌》项目。在这个项目中，我们实现的场景效果为：' +
          '三个颜色不同的圆球从金字塔顶端平台高处滚落，分别推动三排多米诺骨牌接连倒下。',
        amount: 3
      },
      {
        pj_id: '002',
        name: 'Unity开发基础 — Project 1：多米诺骨牌 中',
        start_time: '2020-04-24',
        end_time: '2020-06-24',
        desc: ' 通过这个项目，我们首先学习Unity工程创建、场景构建、资源包导入等基本步骤以及基本游戏对象的创建。' +
          '接着，我们对Unity的物理系统、图形系统、音频进行初步讲解和运用。' +
          '最后，我们在PC和移动平台上部署该项目。本周内容涉及一些脚本代码，大家暂时不需理解它们，我们将在第四周的课程中进行讲解。\n' +
          '\n',
        amount: 3
      },
      {
        pj_id: '003',
        name: 'Unity脚本编程 — Project 2：慕课英雄 MOOC HERO（第三人称射击简易版）',
        start_time: '2020-04-24',
        end_time: '2020-06-24',
        desc: '大家好，欢迎进入第四周的学习！ 通过本周的学习，我们制作《慕课英雄》（MOOC HERO）第三人称射击游戏的简易版。' +
          '在这个游戏中，玩家通过键盘控制自己的avatar慕课英雄，躲避僵尸的袭击，射击消灭僵尸，直到玩家生命值为零或者射杀足够数量的僵尸取得胜利。' +
          '在本周课程中，我们首先回顾《多米诺骨牌》项目中的代码，讲解Unity脚本的编写，包括脚本生命周期以及一些常用的API（应用程序编程接口）。',
        amount: 3
      },
      {
        pj_id: '004',
        name: 'Unity脚本编程 — Project 2：慕课英雄 MOOC HERO（第三人称射击简易版）',
        start_time: '2020-04-24',
        end_time: '2020-06-24',
        desc: '接着，我们学习使用Unity的地形系统构造山地、树木、草地，并将多米诺骨牌模型放置在构造好的地形中。然后，我们在游戏场景中添加玩家和敌人，' +
          '使用Unity动画系统控制玩家与敌人的动画播放，学习玩家和敌人脚本的编写，实现玩家的移动、攻击、生命值管理以及敌人的追踪、攻击、死亡等功能。' +
          '最后，我们使用脚本控制游戏的整体进程，包括游戏胜利、失败的判断以及敌人的自动生成等。' +
          ' 本周内容涉及Unity图形用户界面（uGUI）、线渲染器（枪械射线）等知识，大家暂时不需要理解它们，我们将在第五周的课程中进行讲解。',
        amount: 3
      },
      {
        pj_id: '005',
        name: 'Project 3：慕课英雄 MOOC HERO（第一人称射击完整版）',
        start_time: '2020-04-24',
        end_time: '2020-06-24',
        desc: '大家好，欢迎进入最后一周的学习！ 在本周的学习中，我们对第四周的游戏进行改进和完善，' +
          '实现《慕课英雄》（MOOC HERO）第一人称射击游戏的完整版。在本周课程中，我们首先修改人物控制脚本、摄像机跟随脚本，' +
          '将游戏人称从第三人称更改为第一人称。接着，我们学习使用uGUI制作游戏界面、移动平台的游戏操控和屏幕适配。' +
          '然后，我们学习利用粒子系统和线渲染器制作玩家开枪效果和场景火焰效果。最后，我们在场景中添加血瓶收集功能、游戏胜利和失败的效果。',
        amount: 3
      },
      {
        pj_id: '006',
        name: 'Project 3：慕课英雄 MOOC HERO（第一人称射击完整版）',
        start_time: '2020-04-24',
        end_time: '2020-06-24',
        desc: '大家好，欢迎学习本门课程，踏上游戏开发之路！ 本课程，我们使用Unity游戏引擎学习游戏开发，将开发的游戏部署到PC端和移动终端。' +
          '本周课程的学习中，我们首先介绍课程的基本信息。接着，我们学习下载、安装Unity编辑器，并对Unity编辑器的界面、操作进行初步了解；' +
          '最后，我们学习图形、音频等游戏资源的相关知识以及制作获取途径。' +
          ' 如果在概念、测试或是技术细节上遇到困难，可以在讨论区寻求帮助。希望大家融入Coursera学习社区，互相帮助，共同进步。 现在，让我们开始游戏开发之旅！',
        amount: 3
      },
      {
        pj_id: '006',
        name: 'Project 3：慕课英雄 MOOC HERO（第一人称射击完整版）',
        start_time: '2020-04-24',
        end_time: '2020-06-24',
        desc: '大家好，欢迎学习本门课程，踏上游戏开发之路！ 本课程，我们使用Unity游戏引擎学习游戏开发，将开发的游戏部署到PC端和移动终端。' +
          '本周课程的学习中，我们首先介绍课程的基本信息。接着，我们学习下载、安装Unity编辑器，并对Unity编辑器的界面、操作进行初步了解；' +
          '最后，我们学习图形、音频等游戏资源的相关知识以及制作获取途径。' +
          ' 如果在概念、测试或是技术细节上遇到困难，可以在讨论区寻求帮助。希望大家融入Coursera学习社区，互相帮助，共同进步。 现在，让我们开始游戏开发之旅！',
        amount: 3
      },

    ];

    return this.projectList;
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

  }

  /**
   * 学生加入项目
   * @parameter studentID
   * @parameter courseID
   * @parameter projectID
   */
  joinProject(studentID, courseID, projectID) {

  }

}
