import {Component, ElementRef, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {FormBuilder} from '@angular/forms';
import {ProjectDetailDialogComponent} from '../dialogs/project-detail-dialog/project-detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskDialogComponent} from '../dialogs/add-task-dialog/add-task-dialog.component';
import {CreateDiscussionDialogComponent} from '../dialogs/create-discussion-dialog/create-discussion-dialog.component';
import {UploadFileDialogComponent} from '../dialogs/upload-file-dialog/upload-file-dialog.component';

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
  pjInfoForm;

  tabs = [];
  contents = [];
  panelOpenState = false;

  displayedTaskColumns: string[] = ['id', 'name', 'status'];
  taskInfo = ELEMENT_DATA;

  displayedFileColumns: string[] = ['id', 'name', 'uploader', 'date', 'size', 'option'];
  fileList = TEST_FILE_DATA;

  // 表单
  gradeForm;
  uploadForm;

  constructor(
    private elementRef: ElementRef,
    public sessionService: SessionService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.gradeForm = this.formBuilder.group({
      discussGrade: '',
      taskGrade: '',
    });

    this.uploadForm = this.formBuilder.group({
      file: null,
    });

    this.createPJInfoForm();
  }

  ngOnInit(): void {
    this.tabs = this.elementRef.nativeElement.querySelectorAll('.sidebar-row');
    this.contents = this.elementRef.nativeElement.querySelectorAll('.tab-content');
    console.log(this.tabs);
    console.log(this.contents);
  }

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

  onSubmit(userData) {
    this.isEditing = false;
    this.createPJInfoForm();
    console.log(userData);
  }

  openDialog(module): void {
    let dialogRef;
    switch (module) {
      case 'task':
        dialogRef = this.dialog.open(AddTaskDialogComponent, {
          // width: '700px',
          // height: '450px',
        });
        break;
      case 'discussion':
        dialogRef = this.dialog.open(CreateDiscussionDialogComponent, {
          // width: '700px',
          // height: '450px',
        });
        break;
      case 'file':
        dialogRef = this.dialog.open(UploadFileDialogComponent, {
          // width: '700px',
          // height: '450px',
        });
        break;
      default:
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeEdit() {
    this.isEditing = !this.isEditing;
    this.createPJInfoForm();
  }

}
