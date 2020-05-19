import {Component, ElementRef, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {FormBuilder} from '@angular/forms';

export interface Task {
  id: number;
  name: string;
  status: string;
}

export interface ProjectFile {
  id: number;
  name: string;
  uploader: string;
  option: string;
}

const ELEMENT_DATA: Task[] = [
  {id: 1, name: 'Hydrogen', status: 'finish'},
  {id: 2, name: 'Helium', status: 'overtime'},
  {id: 3, name: 'Lithium', status: 'finish'},
  {id: 4, name: 'Beryllium', status: 'undo'},
];

const TEST_FILE_DATA: ProjectFile[] = [
  {id: 1, name: 'IMAGE', uploader: 'who', option: 'all'},
  {id: 2, name: 'Helium', uploader: 'who', option: 'read'},
  {id: 3, name: 'Lithium', uploader: 'who', option: 'all'},
  {id: 4, name: 'Beryllium', uploader: 'who', option: 'all'},
];


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  tabs = [];
  contents = [];
  panelOpenState = false;

  displayedTaskColumns: string[] = ['id', 'name', 'status'];
  taskInfo = ELEMENT_DATA;

  displayedFileColumns: string[] = ['id', 'name', 'uploader', 'option'];
  fileList = TEST_FILE_DATA;

  gradeForm;

  constructor(
    private elementRef: ElementRef,
    public sessionService: SessionService,
    private formBuilder: FormBuilder,
  ) {
    this.gradeForm = this.formBuilder.group({
      discussGrade: '',
      taskGrade: '',
    });
  }

  ngOnInit(): void {
    this.tabs = this.elementRef.nativeElement.querySelectorAll('.sidebar-row');
    this.contents = this.elementRef.nativeElement.querySelectorAll('.tab-content');
    console.log(this.tabs);
    console.log(this.contents);
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
    console.log(userData.discussGrade);
    console.log(userData.taskGrade);
  }
}
