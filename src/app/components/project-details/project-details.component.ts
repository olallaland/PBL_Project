import {Component, ElementRef, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {FormBuilder} from '@angular/forms';
import {ProjectDetailDialogComponent} from '../dialogs/project-detail-dialog/project-detail-dialog.component';
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

export interface Task {
  id: number;
  name: string;
  status: string;
}

export interface ProjectFile {
  id: number;
  name: string;
  date: string;
  uploader: string;
  size: number;
  option: string;
}

const ELEMENT_DATA: Task[] = [
  {id: 1, name: 'Hydrogen', status: 'finish'},
  {id: 2, name: 'Helium', status: 'overtime'},
  {id: 3, name: 'Lithium', status: 'finish'},
  {id: 4, name: 'Beryllium', status: 'undo'},
];

const TEST_FILE_DATA: ProjectFile[] = [
  {id: 1, name: 'IMAGE', date: '2020-05-01', uploader: 'who', size: 365, option: 'all'},
  {id: 2, name: 'Helium', date: '2020-05-02', uploader: 'who', size: 128, option: 'read'},
  {id: 3, name: 'Lithium', date: '2020-05-03', uploader: 'who', size: 999, option: 'all'},
  {id: 4, name: 'Beryllium', date: '2020-05-04', uploader: 'who', size: 50, option: 'all'},
];


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  pjInfoParams = {
    title: 'this is title',
    intro: 'this is intro',
    number: 0,
    startDate: '2020-05-06',
    endDate: '2020-06-26',
  };
  isEditing = false;

  tabs = [];
  contents = [];
  panelOpenState = false;

  displayedTaskColumns: string[] = ['id', 'name', 'status'];
  taskInfo = ELEMENT_DATA;

  displayedFileColumns: string[] = ['id', 'name', 'uploader', 'date', 'size', 'option'];

  // 项目信息表单
  pjInfoForm;

  // course id
  courseID;
  // pj id
  projectID;
  // project info
  projectInfo;
  // 小组成员work情况
  memberList;
  // 项目任务列表
  taskList;
  // 讨论列表
  discussionList;
  // 文件列表
  fileList = TEST_FILE_DATA;

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
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    // tab 切换
    this.tabs = this.elementRef.nativeElement.querySelectorAll('.sidebar-row');
    this.contents = this.elementRef.nativeElement.querySelectorAll('.tab-content');
    // console.log(this.tabs);
    // console.log(this.contents);

    // 获得url中的 project ID
    this.activatedRoute.params.subscribe((data) => {
      this.courseID = data.courseID;
      this.projectID = data.projectID;
      console.log('inner course id: ' + this.courseID);
      console.log('inner pj id: ' + this.projectID);
    });

    // 根据course ID 和 pj id 获得pj list信息
    this.projectService.getProjectInfo(this.courseID, this.projectID).subscribe( (res: RResponse) => {
      this.projectInfo = res.data;
      console.log(this.projectInfo);
      this.createPJInfoForm();
    });

    // 获取组员信息（每个组员的姓名、组内身份以及任务完成情况）

    // // 获取项目的任务列表
    // this.taskService.getTaskList(this.courseID, this.projectID).subscribe( (res: RResponse) => {
    //   this.taskList = res.data;
    //   console.log(this.taskList);
    // });
    //
    // // 获取项目的讨论列表
    // this.discussionService.getDiscussionList(this.courseID, this.projectID).subscribe( (res: RResponse) => {
    //   this.discussionList = res.data;
    //
    //   // 获取每个讨论下的回复
    //   // tslint:disable-next-line:prefer-for-of
    //   for (let i = 0; i < this.discussionList.length; i++) {
    //     this.discussionService.getAnswerList(this.discussionList[i].discussion_id).subscribe((response: RResponse) => {
    //       this.discussionList[i].answers = response.data;
    //     });
    //   }
    //   console.log(this.discussionList);
    // });
    //
    // // 获取项目的文件列表
    // this.fileService.getFileList(this.courseID, this.projectID).subscribe( (res: RResponse) => {
    //   this.fileList = res.data;
    //   console.log(this.fileList);
    // });
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
      number: [{
        value: this.projectInfo.number,
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
    console.log(index);
    // console.log(this.tabs);
    // console.log(this.contents);
    // console.log(this.tabs[index]);
    // console.log(this.contents[index]);
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
   * 表单提交函数
   * @parameter userData 表单数据
   */
  onSubmit(projectData) {
    this.projectService.updateProject(projectData).subscribe((res: RResponse) => {
      if (res.code === 200) {
        this.toastrService.success('修改成功', '', {
          timeOut: 1500,
        });
      } else{
        this.toastrService.error(res.msg, '修改失败', {
          timeOut: 1500,
        });
      }
    });
    this.isEditing = false;
    this.createPJInfoForm();
    console.log(projectData);
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
        });
        break;
      case 'discussion':
        dialogRef = this.dialog.open(CreateDiscussionDialogComponent, {
        });
        break;
      case 'score':
        dialogRef = this.dialog.open(ScoreDialogComponent, {
        });
        break;
      case 'file':
        dialogRef = this.dialog.open(UploadFileDialogComponent, {
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
   * 切换项目简介 只读 和 可编辑状态
   */
  changeEdit() {
    this.isEditing = !this.isEditing;
    this.createPJInfoForm();
  }

}
