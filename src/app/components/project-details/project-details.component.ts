import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskDialogComponent} from '../dialogs/add-task-dialog/add-task-dialog.component';
import {CreateDiscussionDialogComponent} from '../dialogs/create-discussion-dialog/create-discussion-dialog.component';
import {UploadFileDialogComponent} from '../dialogs/upload-file-dialog/upload-file-dialog.component';
import {ProjectService} from '../../services/project.service';
import {ScoreDialogComponent} from '../dialogs/score-dialog/score-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RResponse} from '../../entities/RResponse';
import {TaskService} from '../../services/task.service';
import {DiscussionService} from '../../services/discussion.service';
import {FileService} from '../../services/file.service';
import {ToastrService} from 'ngx-toastr';
import {ProjectFile} from '../../entities/ProjectFile';

export interface Task {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  isEditing = false;

  tabs = [];
  contents = [];
  panelOpenState = false;

  displayedTaskColumns: string[] = ['mission_id', 'mission_name', 'status'];

  displayedFileColumns: string[] = ['file_id', 'name', 'user_id', 'upload_date', 'size', 'description', 'option'];

  // 项目信息表单
  pjInfoForm;

  // course id
  courseID;
  // pj id
  projectID;
  // project info
  projectInfo;
  // 小组成员任务情况
  memberTaskInfo = [];
  // 小组成员得分情况
  memberScoreInfo = [];
  // 项目任务列表
  taskList;
  // 任务开始时间（规定为创建任务的时间）
  taskStartTime;
  // 讨论列表
  discussionList;
  // 文件列表
  fileList: ProjectFile;
  // 项目成员列表
  studentList = [];
  // 项目组长
  captain = {
    student_id: undefined,
    name: undefined
  };
  // 回复内容
  replyContent = '';

  baseUrl;

  constructor(
    private elementRef: ElementRef,
    public sessionService: SessionService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private discussionService: DiscussionService,
    private fileService: FileService,
    private toastrService: ToastrService,
    @Inject('BASE_CONFIG') bgConfig
  ) {
    this.baseUrl = bgConfig;
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }
  }

  ngOnInit(): void {
    // tab 切换
    this.tabs = this.elementRef.nativeElement.querySelectorAll('.sidebar-row');
    this.contents = this.elementRef.nativeElement.querySelectorAll('.tab-content');
    // console.log(this.tabs);
    // console.log(this.contents);

    // 获得url中的 project ID
    this.activatedRoute.params.subscribe((data) => {
      this.courseID = data.courseID;
      this.projectID = data.projectID;
    });

    // 根据course ID 和 pj id 获得pj 信息
    this.projectService.getProjectInfo(this.courseID, this.projectID).subscribe((res: RResponse) => {
      this.projectInfo = res.data;
      this.captain.student_id = this.projectInfo.captain;
      // console.log(this.projectInfo);
      this.createPJInfoForm();
    });

    // 获取参与与该项目的学生列表
    this.projectService.getProjectMembers(this.courseID, this.projectID).subscribe((response: RResponse) => {
      // console.log(response);
      if (response.code === 200) {
        this.studentList = response.data;
        // 组长
        for (const student of response.data) {
          if (student.student_id === this.captain.student_id) {
            this.captain.name = student.name;
          }
        }

        // 获取小组成员任务完成情况
        this.getMemberTaskComple();

        // 获取得分情况
        this.getMemberScore();
      }
    });

    // 获取当前项目的任务列表
    this.getTaskList();

    // 获取当前项目的讨论列表
    this.getDiscussionList();

    // 获取当前项目的文件列表
    this.getFileList();

    this.createPJInfoForm();
  }

  /**
   * 初始化pjInfoForm
   */
  createPJInfoForm() {
    this.pjInfoForm = this.formBuilder.group({
      name: [{
        value: this.projectInfo.name,
        disabled: !this.isEditing,
      }],
      descs: [{
        value: this.projectInfo.descs,
        disabled: !this.isEditing,
      }],
      amount: [{
        value: this.projectInfo.amount,
        disabled: true,
      }],
      start: [{
        value: this.projectInfo.start,
        disabled: !this.isEditing,
      }],
      end: [{
        value: this.projectInfo.end,
        disabled: !this.isEditing,
      }],
      course_id: this.projectInfo.course_id,
      pj_id: this.projectInfo.pj_id,
      captain: this.projectInfo.captain
    });
  }

  /**
   * 侧边栏切换控制
   * @parameter index
   */
  changeTab(index) {
    // console.log(index);
    for (let i = 0; i < this.tabs.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (i == index) {
        this.contents[i].className = 'tab-content current-tab';
        this.tabs[i].className = 'mat-toolbar-row sidebar-row selected';
      } else {
        this.contents[i].className = 'tab-content';
        this.tabs[i].className = 'mat-toolbar-row sidebar-row';
      }
    }
  }

  /**
   * 获取项目的任务列表
   */
  getTaskList() {
    this.taskService.getTaskList(this.courseID, this.projectID).subscribe((res: RResponse) => {
      this.taskList = res.data;
      // console.log('tasks: ' + res.data);
      // console.log(this.taskList);
    });
  }

  /**
   * 修改项目信息并提交
   * @parameter userData 表单数据
   */
  updateProject(projectData) {
    this.projectService.updateProject(projectData).subscribe((res: RResponse) => {
      if (res.code === 200) {
        this.toastrService.success('修改成功', '', {
          timeOut: 1500,
        });
      } else {
        this.toastrService.error(res.msg, '修改失败', {
          timeOut: 1500,
        });
      }
    });
    this.isEditing = false;
    this.createPJInfoForm();
  }

  /**
   * 获得组员任务完成情况
   */
  getMemberTaskComple() {
    this.memberTaskInfo = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.studentList.length; i++) {
      if (this.sessionService.get('userIdentity') === 'student') {
        this.taskService.getStudentTasks(this.courseID, this.projectID,
          this.sessionService.get('userID')).subscribe((response: RResponse) => {
          const singleStudent = {
            student: this.studentList[i],
            taskInfo: response.data
          };
          if (this.sessionService.get('userID') === this.studentList[i].student_id) {
            this.memberTaskInfo.push(singleStudent);
          }
        });
      } else {
        // console.log(this.studentList[i].student_id);
        this.taskService.getStudentTasks(this.courseID, this.projectID,
          this.studentList[i].student_id).subscribe((response: RResponse) => {
          // console.log('user de: ' + response.data);
          const singleStudent = {
            student: this.studentList[i],
            taskInfo: response.data
          };
          this.memberTaskInfo.push(singleStudent);
        });
      }
    }

  }

  /**
   * 获得组员得分情况
   */
  getMemberScore() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.studentList.length; i++) {
      if (this.sessionService.get('userIdentity') === 'student') {
        // console.log(this.studentList[i].student_id);
        this.projectService.getStudentScore(this.courseID, this.projectID,
          this.studentList[i].student_id).subscribe((response: RResponse) => {
          // console.log('score de de de : ' + response.data);

          const singleStudent = {
            student: this.studentList[i],
            score: response.data
          };
          if (this.sessionService.get('userID') === this.studentList[i].student_id) {
            this.memberScoreInfo.push(singleStudent);
          }
        });
      } else {
        // console.log(this.studentList[i].student_id);
        this.projectService.getStudentScore(this.courseID, this.projectID,
          this.studentList[i].student_id).subscribe((response: RResponse) => {
          const singleStudent = {
            student: this.studentList[i],
            score: response.data
          };
          this.memberScoreInfo.push(singleStudent);
        });
      }
    }
  }

  /**
   * 刷新任务列表
   */
  refreshTaskList() {
    this.getTaskList();
  }

  /**
   * 修改某个任务的信息
   * @parameter taskIndex
   */
  updateTask(taskIndex, item, value) {
    if (item === 'status') {
      // console.log(this.taskList[taskIndex].status);
      this.taskList[taskIndex].status = value;
      // console.log(this.taskList[taskIndex].status);
    } else if (item === 'stu_id') {
      // console.log(this.taskList[taskIndex].status);
      this.taskList[taskIndex].stu_id = value;
      // console.log(this.taskList[taskIndex].status);
    }

    this.taskService.updateTask(this.taskList[taskIndex]).subscribe((response: RResponse) => {
      if (response.code === 200) {
        this.toastrService.success('更新成功', '', {
          timeOut: 1500,
        });
      } else {
        this.toastrService.warning('更新失败', '', {
          timeOut: 1500,
        });
      }
      // console.log(response);
    });
  }

  /**
   * 获取项目的所有讨论列表
   */
  getDiscussionList() {
    this.discussionService.getDiscussionList(this.courseID, this.projectID).subscribe((res: RResponse) => {
      this.discussionList = res.data;
      // console.log('discussions: ' + res.data);

      // 获取每个讨论的回复列表
      for (let i = 0; i < this.discussionList.length; i++) {
        this.getReplyList(i);
      }
    });
  }

  /**
   * 刷新讨论列表
   */
  refreshDisList() {
    this.getDiscussionList();
  }

  /**
   * 获取每个讨论下的回复列表
   * @parameter index
   * @parameter discussionID
   */
  getReplyList(index) {
    this.discussionService.getAnswerList(this.discussionList[index].discussion_id).subscribe((response: RResponse) => {
      // console.log('reply list: ' + response.data);
      this.discussionList[index].answerList = response.data;
    });
  }

  /**
   * 回复讨论
   * @parameter discussionID
   */
  addReply(discussionID) {
    // console.log(discussionID);
    // console.log('content: ' + this.replyContent);
    if (this.replyContent.trim() === '') {
      this.toastrService.warning('回复内容为空', '回复失败', {
        timeOut: 1500,
      });
    } else {
      const currentTime = this.getCurrentDateTime();
      const reply = {
        user_id: this.sessionService.get('userID'),
        discussion_id: discussionID,
        answer_time: currentTime,
        content: this.replyContent
      };

      this.discussionService.addAnswer(reply).subscribe((response: RResponse) => {
        // console.log(response);
        this.toastrService.success('回复成功！', '', {
          timeOut: 1500,
        });
      });

      this.replyContent = '';
      this.refreshDisList();
    }
  }

  /**
   * 刷新评分面板
   */
  refreshScoreList() {
    this.getMemberTaskComple();
    this.getMemberScore();
  }

  /**
   * 获取文件列表
   */
  getFileList() {
    // 获取项目的文件列表
    this.fileService.getFileList(this.courseID, this.projectID).subscribe((res: RResponse) => {
      this.fileList = res.data;
      // console.log(this.fileList);
    });
  }

  /**
   * 根据文件 id 删除文件
   * @parameter fileID
   */
  deleteFile(fileID) {
    // console.log('delete: ' + fileID);
    // 删除文件
    this.fileService.deleteFile(fileID).subscribe((res: RResponse) => {
      // console.log(res);
      if (res.code === 200) {
        this.refreshFileList();
        this.toastrService.success('删除成功', '', {
          timeOut: 1500,
        });
      } else {
        this.toastrService.error(res.msg, '删除失败', {
          timeOut: 1500,
        });
      }
    });
  }

  /**
   * 刷新文件列表
   */
  refreshFileList() {
    this.getFileList();
  }

  /**
   * 打开弹窗
   * @parameter module 弹窗的类型
   */
  openDialog(module): void {
    let dialogRef;
    switch (module) {
      case 'task':
        dialogRef = this.dialog.open(AddTaskDialogComponent, {
          data: {
            courseID: this.courseID,
            projectID: this.projectID,
            studentList: this.studentList
          }
        });
        break;
      case 'discussion':
        dialogRef = this.dialog.open(CreateDiscussionDialogComponent, {
          data: {
            courseID: this.courseID,
            projectID: this.projectID
          }
        });
        break;
      case 'file':
        dialogRef = this.dialog.open(UploadFileDialogComponent, {
          data: {
            courseID: this.courseID,
            projectID: this.projectID
          }
        });
        break;
      default:
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * 打开评分弹窗
   * @parameter index
   */
  openScoreDialog(index) {
    const dialogRef = this.dialog.open(ScoreDialogComponent, {
      data: {
        courseID: this.courseID,
        projectID: this.projectID,
        studentID: this.studentList[index].student_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMemberScore();
      console.log('The dialog was closed');
    });
  }

  /**
   * 切换项目简介 只读 和 可编辑状态
   */
  changeEdit() {
    this.isEditing = !this.isEditing;
    this.createPJInfoForm();
  }

  /**
   * 获取当前时间并格式化，作为任务开始时间
   */
  getCurrentDateTime() {
    const date = new Date();
    const month = date.getMonth() + 1;
    let curDateTime = '';

    if (month < 10) {
      curDateTime = date.getFullYear() + '-' + '0' + month + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes();
    } else {
      curDateTime = date.getFullYear() + '-' + month + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes();
    }
    // console.log(curDateTime);
    return curDateTime;
  }
}
