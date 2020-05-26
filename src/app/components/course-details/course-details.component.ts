import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ProjectDetailDialogComponent} from '../dialogs/project-detail-dialog/project-detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';

export interface DialogData {
  pj_id: string;
  name: string;
  start_time: string;
  end_time: string;
  desc: string;
  amount: number;
}


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  projectList = [];
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    public sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('user') == null) {
      this.router.navigate(['user/login']);
    }

    this.projectList = this.projectService.getProjectList('id');
  }

  openDialog(index): void {
    const dialogRef = this.dialog.open(ProjectDetailDialogComponent, {
      // width: '700px',
      // height: '450px',
      data: {
        pj_id: this.projectList[index].pj_id,
        name: this.projectList[index].name,
        start_time: this.projectList[index].start_time,
        end_time: this.projectList[index].end_time,
        desc: this.projectList[index].desc,
        amount: this.projectList[index].amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
