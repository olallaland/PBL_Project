import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {RResponse} from '../../../entities/RResponse';
import {ProjectService} from '../../../services/project.service';
import {TaskService} from '../../../services/task.service';
import {ToastrService} from 'ngx-toastr';

export interface ProjectInfo {
  courseID: string;
  projectID: string;
  studentList: [];
}

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})


export class AddTaskDialogComponent implements OnInit {

  addTaskForm;
  studentList = [];
  taskStartTime;
  endTime;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    public formBuilder: FormBuilder,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: ProjectInfo,
    private taskService: TaskService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.taskStartTime = this.getCurrentDateTime();
    this.addTaskForm = this.formBuilder.group({
      course_id: this.data.courseID,
      pj_id: this.data.projectID,
      mission_id: undefined,
      mission_name: undefined,
      stu_id: undefined,
      start: this.taskStartTime,
      end: '',
      level: 1,
      status: '未开始'
    });
  }

  /**
   * 获取当前时间并格式化，作为任务开始时间
   */
  getCurrentDateTime() {
    const date = new Date();
    const month = date.getMonth() + 1;
    let curDateTime = '';

    if (month < 10) {
      curDateTime = date.getFullYear() + '-' + '0' + month + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes();
    } else {
      curDateTime = date.getFullYear() + '-' + month + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes();
    }
    console.log(curDateTime);
    return curDateTime;
  }

  onSubmit(taskData) {
    console.log(taskData);
    this.taskService.createTask(taskData).subscribe((res: RResponse) => {
      console.log(res);
      if (res.code === 200) {
        this.toastrService.success('创建成功', '', {
          timeOut: 1500,
        });

        this.dialogRef.close();
      } else{
        this.toastrService.error(res.msg, '创建失败', {
          timeOut: 1500,
        });
      }
    });
  }
}
