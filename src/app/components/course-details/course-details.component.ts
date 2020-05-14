import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ProjectDetailDialogComponent} from '../dialogs/project-detail-dialog/project-detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
  ) { }

  ngOnInit(): void {
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
