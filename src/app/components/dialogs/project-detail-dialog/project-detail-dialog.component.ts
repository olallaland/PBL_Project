import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectInfo} from '../../../entities/ProjectInfo';
import {SessionService} from '../../../services/session.service';
import {RResponse} from '../../../entities/RResponse';
import {ProjectService} from '../../../services/project.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-project-detail-dialog',
  templateUrl: './project-detail-dialog.component.html',
  styleUrls: ['./project-detail-dialog.component.css']
})
export class ProjectDetailDialogComponent implements OnInit {

  studentList = [];
  constructor(
    public dialogRef: MatDialogRef<ProjectDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectInfo,
    public sessionService: SessionService,
    private projectService: ProjectService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // 获取参与与该项目的学生列表
    this.projectService.getProjectMembers(this.data.course_id, this.data.pj_id).subscribe((response: RResponse) => {
      console.log(response);
      if (response.code === 200) {
        for (const student of response.data) {
          this.studentList.push(student.student_id);
        }
        console.log(this.studentList);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  joinProject() {
    if (this.data.amount >= 4) {
     // 加入项目失败，弹出提示框
      this.toastrService.warning('项目人数已满', '加入失败', {
        timeOut: 1500,
      });
      return;
    }

    this.projectService.joinProject(this.data.course_id, this.data.pj_id,
      this.sessionService.get('userID')).subscribe((response: RResponse) => {
      if (response.code === 200) {
        // 加入项目成功，弹出提示框
        this.toastrService.success('加入项目成功', '', {
          timeOut: 1500,
        });

        // 刷新页面
        window.location.reload();
      } else {
        // 加入项目失败，弹出提示框
        this.toastrService.warning(response.msg, '加入失败', {
          timeOut: 1500,
        });
      }
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.data.course_id, this.data.pj_id).subscribe((response: RResponse) => {
      if (response.code === 200) {
        // 删除项目成功，弹出提示框
        this.toastrService.success('删除项目成功', '', {
          timeOut: 1500,
        });

        // 刷新页面
        window.location.reload();
      } else {
        // 删除项目失败，弹出提示框
        this.toastrService.error(response.msg, '删除失败', {
          timeOut: 1500,
        });
      }
    });
  }

  showJoinButton(): boolean {
    return this.sessionService.get('userIdentity') === 'student' &&
      this.studentList.indexOf(this.sessionService.get('userID')) === -1
      && this.data.amount < 4;
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
