import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {SuccessfulResponse} from '../../entities/SuccessfulResponse';
import {RResponse} from '../../entities/RResponse';
import {UserManagementService} from '../../services/user-management.service';
import {MatDialog} from '@angular/material/dialog';
import {UserDetailDialogComponent} from '../dialogs/user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  studentList = [];
  teacherList = [];
  userList = [];
  serviceUrl;

  constructor(
    private userManagementService: UserManagementService,
    private dialog: MatDialog,
    public sessionService: SessionService,
    private router: Router,
    @Inject('BASE_CONFIG') serviceUrl,
  ) {
    this.serviceUrl = serviceUrl;
  }

  ngOnInit(): void {
    // 限制非管理员打开本页面
    if (this.sessionService.get('userIdentity') !== 'admin') {
      this.router.navigate(['user/login']);
    }

    // 展示所有用户
    this.userManagementService.getAllStudents().subscribe((res: RResponse) => {
      console.log('student: ' + res.data);
      this.studentList = res.data;
      console.log(this.studentList);

      for (const student of this.studentList) {
        const user = {
          user_type: 'student',
          user_id: student.student_id,
          user_name: student.name,
          gender: student.gender,
          password: student.password,
          picture: student.picture
        };
        this.userList.push(user);
      }
    });

    this.userManagementService.getAllTeachers().subscribe((res: RResponse) => {
      console.log('teacher: ' + res.data);
      this.teacherList = res.data;
      console.log(this.teacherList);

      for (const teacher of this.teacherList) {
        const user = {
          user_type: 'teacher',
          user_id: teacher.teacher_id,
          user_name: teacher.name,
          gender: teacher.gender,
          password: teacher.password,
          picture: teacher.picture
        };
        this.userList.push(user);
      }
    });

  }

  openDialog(index): void {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      // width: '700px',
      // height: '450px',
      data: {
        user_type: this.userList[index].user_type,
        user_id: this.userList[index].user_id,
        user_name: this.userList[index].user_name,
        password: this.userList[index].password,
        gender: this.userList[index].gender,
        picture: this.userList[index].picture
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
