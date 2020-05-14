import { Component, OnInit, Inject} from '@angular/core';
import { CourseService } from '../../services/course.service';
import {CourseDetailDialogComponent} from '../dialogs/course-detail-dialog/course-detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SessionService} from '../../services/session.service';

export interface DialogData {
  course_id: string;
  name: string;
  teacher_name: string;
  exam_time: string;
  course_time: string;
  desc: string;
  amount: number;
}


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseList = [];
  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
    public sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.courseList = this.courseService.getCourseList('student', '001');
  }

  openDialog(index): void {
    const dialogRef = this.dialog.open(CourseDetailDialogComponent, {
      // width: '700px',
      // height: '450px',
      data: {
        course_id: this.courseList[index].course_id,
        name: this.courseList[index].name,
        teacher_name: this.courseList[index].teacher_name,
        exam_time: this.courseList[index].exam_time,
        course_time: this.courseList[index].course_time,
        desc: this.courseList[index].desc,
        amount: this.courseList[index].amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
