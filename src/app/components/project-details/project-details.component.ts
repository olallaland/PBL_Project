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
  fileList = TEST_FILE_DATA;

  // 表单
  pjInfoForm;

  taskList;

  constructor(
    private elementRef: ElementRef,
    public sessionService: SessionService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private projectService: ProjectService,
  ) {
    this.createPJInfoForm();
  }

  ngOnInit(): void {
    this.tabs = this.elementRef.nativeElement.querySelectorAll('.sidebar-row');
    this.contents = this.elementRef.nativeElement.querySelectorAll('.tab-content');
    // 获取任务列表需要两个参数，第一个为course_id, 第二个为pj_id
    this.taskList = this.projectService.getTaskList('01', '02');
    console.log(this.tabs);
    console.log(this.contents);
  }

  /**
   * 初始化pjInfoForm
   */
  createPJInfoForm() {
    this.pjInfoForm = this.formBuilder.group({
      title: [{
        value: this.pjInfoParams.title,
        disabled: !this.isEditing,
      }],
      intro: [{
        value: this.pjInfoParams.intro,
        disabled: !this.isEditing,
      }],
      number: [{
        value: this.pjInfoParams.number,
        disabled: true,
      }],
      startDate: [{
        value: this.pjInfoParams.startDate,
        disabled: !this.isEditing,
      }],
      endDate: [{
        value: this.pjInfoParams.endDate,
        disabled: !this.isEditing,
      }],
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
  onSubmit(userData) {
    this.isEditing = false;
    this.createPJInfoForm();
    console.log(userData);
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
