import { Component, OnInit, Inject} from '@angular/core';
import { CourseService } from '../../services/course.service';
import {CourseDetailDialogComponent} from '../dialogs/course-detail-dialog/course-detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {RResponse} from '../../entities/RResponse';

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
  ) {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    // 获得course list信息，如果在用户个人页面，展示用户take or teach的课程
    // 如果在课程列表页面，展示所有课程
    if (this.router.url.startsWith('/user')) {
      this.courseService.getCourseList().subscribe( (res: RResponse) => {
        this.courseList = res.data;
        // console.log(this.courseList);
      });
    } else if (this.router.url.startsWith('/course')) {
      this.courseService.getAllCourse().subscribe( (res: RResponse) => {
        this.courseList = res.data;
        // console.log(this.courseList);
      });
    }
  }

  ngOnInit(): void {
  }

  openDialog(index): void {
    let studentList = [];

    // 根据 course ID 获得选课学生列表
    this.courseService.getCourseRoster(this.courseList[index].course_id).subscribe( (res: RResponse) => {
      studentList = res.data;
      // console.log(studentList);
      // console.log('am I in this course?: ' + this.studentList.indexOf(this.sessionService.get('userID')));
      const dialogRef = this.dialog.open(CourseDetailDialogComponent, {
        minWidth: '500px',
        minHeight: '300px',
        data: {
          student_list: studentList,
          course_id: this.courseList[index].course_id,
          course_name: this.courseList[index].course_name,
          teacher_name: this.courseList[index].teacher_name,
          teacher_id: this.courseList[index].teacher_id,
          exam_time: this.courseList[index].exam_time,
          course_time: this.courseList[index].course_time,
          descs: this.courseList[index].descs,
          amount: this.courseList[index].amount
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
    });
  }

}
