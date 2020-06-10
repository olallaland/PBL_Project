import { Component, OnInit, Inject} from '@angular/core';
import { CourseService } from '../../services/course.service';
import {CourseDetailDialogComponent} from '../dialogs/course-detail-dialog/course-detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';

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
    public sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    // this.courseList = this.courseService.getCourseList('student', '001');

    // 获得user信息
    this.courseService.getCourseList1().subscribe( (res: [] ) => {
      this.courseList = res;
      console.log(this.courseList);
    });
  }

  openDialog(index): void {
    const dialogRef = this.dialog.open(CourseDetailDialogComponent, {
      // width: '700px',
      // height: '450px',
      data: {
        course_id: this.courseList[index].course_id,
        course_name: this.courseList[index].name,
        teacher_name: this.courseList[index].teacher_name,
        teacher_id: this.courseList[index].teacher_id,
        start_time: this.courseList[index].startTime,
        end_time: this.courseList[index].endTime,
        desc: this.courseList[index].description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
