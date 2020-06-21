import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CourseInfo} from '../../../entities/CourseInfo';
import {SessionService} from '../../../services/session.service';
import {CourseService} from '../../../services/course.service';
import {RResponse} from '../../../entities/RResponse';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-detail-dialog',
  templateUrl: './course-detail-dialog.component.html',
  styleUrls: ['./course-detail-dialog.component.css']
})
export class CourseDetailDialogComponent implements OnInit {
  studentList;
  constructor(
    public dialogRef: MatDialogRef<CourseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseInfo,
    public sessionService: SessionService,
    public courseService: CourseService,
    private toastrService: ToastrService,
    public router: Router
  ) {
    this.studentList = this.data.student_list;
    // 根据 course ID 获得选课学生列表
    // this.courseService.getCourseRoster(this.data.course_id).subscribe( (res: RResponse) => {
    //   this.studentList = res.data;
    //   // console.log(this.studentList);
    //   // console.log('am I in this course?: ' + this.studentList.indexOf(this.sessionService.get('userID')));
    // });

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enterCourse(courseID) {
    this.dialogRef.close();
    this.router.navigate(['course/details', courseID]);
  }

  joinCourse(courseID) {
    this.courseService.joinCourse(courseID, this.sessionService.get('userID')).subscribe((response: RResponse) => {
      if (response.code === 200) {
        // 选课成功，弹出提示框
        this.toastrService.success('加入课程成功', '', {
          timeOut: 1500,
        });

        // 刷新页面
        window.location.reload();
      } else {
        // 选课失败，弹出提示框
        this.toastrService.warning(response.msg, '', {
          timeOut: 1500,
        });
      }
    });
  }

  deleteCourse(courseID) {
    this.courseService.deleteCourse(courseID).subscribe((response: RResponse) => {
      if (response.code === 200) {
        // 删除课程成功，弹出提示框
        this.toastrService.success('删除课程成功', '', {
          timeOut: 1500,
        });

        // 刷新页面
        window.location.reload();
      } else {
        // 删除课程失败，弹出提示框
        this.toastrService.error(response.msg, '删除失败', {
          timeOut: 1500,
        });
      }
    });
  }

  showJoinButton(): boolean {
    return this.sessionService.get('userIdentity') === 'student' &&
      this.studentList.indexOf(this.sessionService.get('userID')) === -1;
  }

  showEnterButton(): boolean {
    const currentUserIdentity = this.sessionService.get('userIdentity');
    const currentUser = this.sessionService.get('userID');
    return currentUserIdentity === 'admin' ||
      (currentUserIdentity === 'teacher' && currentUser === this.data.teacher_id) ||
      (currentUserIdentity === 'student' && this.studentList.indexOf(currentUser) !== -1);
  }

  showDeleteButton() {
    return this.sessionService.get('userIdentity') === 'admin' ||
      this.sessionService.get('userID') === this.data.teacher_id;
  }

}
