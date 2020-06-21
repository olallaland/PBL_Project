import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {RResponse} from '../../entities/RResponse';
import {CourseService} from '../../services/course.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  addCourseForm;
  teacherList;
  currentTeacher;
  currentDate;

  constructor(
    public formBuilder: FormBuilder,
    public sessionService: SessionService,
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
    private toastrService: ToastrService
  ) {
    this.currentTeacher = this.sessionService.get('userID');
    this.currentDate = this.getCurrentDate();
    this.createAddCourseForm();
  }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    // 获得教师列表
    this.userService.getTeacherList().subscribe( (res: RResponse) => {
      this.teacherList = res.data;
    });
  }

  createAddCourseForm() {
    this.addCourseForm = this.formBuilder.group({
      course_id: '',
      course_name: '',
      teacher_id: this.currentTeacher,
      desc: '',
      exam_time: '',
      course_time: ''
    });
  }

  /**
   * 获取当前时间并格式化，作为项目开始时间
   */
  getCurrentDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    let curDateTime = '';

    if (month < 10) {
      curDateTime = date.getFullYear() + '-' + '0' + month + '-' + date.getDate();
    } else {
      curDateTime = date.getFullYear() + '-' + month + '-' + date.getDate();
    }
    console.log(curDateTime);
    return curDateTime;
  }

  onSubmit(courseData) {
    console.log(courseData);
    // console.log('submit');

    this.courseService.createCourse(courseData).subscribe((response: RResponse) => {
      // console.log(response);
      if (response.code === 200) {
        // 创建成功，弹出提示框
        this.toastrService.success('创建成功', '', {
          timeOut: 1500,
        });

        // 创建成功，跳转到课程列表
        this.router.navigate(['/course/list']);
      } else {
        // 创建失败，弹出提示框
        this.toastrService.error(response.msg, '创建失败', {
          timeOut: 1500,
        });
      }
    });
  }
}
