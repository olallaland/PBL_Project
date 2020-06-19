import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../../services/session.service';
import {DiscussionService} from '../../../services/discussion.service';
import {ProjectInfo} from '../add-task-dialog/add-task-dialog.component';
import {RResponse} from '../../../entities/RResponse';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-discussion-dialog',
  templateUrl: './create-discussion-dialog.component.html',
  styleUrls: ['./create-discussion-dialog.component.css']
})
export class CreateDiscussionDialogComponent implements OnInit {

  newDiscussionForm;

  constructor(
    public dialogRef: MatDialogRef<CreateDiscussionDialogComponent>,
    public formBuilder: FormBuilder,
    private sessionService: SessionService,
    private discussionService: DiscussionService,
    @Inject(MAT_DIALOG_DATA) public data: ProjectInfo,
    private toastrService: ToastrService
  ) {
    this.createNewDiscussionForm();
  }

  ngOnInit(): void {
  }

  createNewDiscussionForm() {
    this.newDiscussionForm = this.formBuilder.group({
      course_id: this.data.courseID,
      pj_id: this.data.projectID,
      initiator: this.sessionService.get('userID'),
      title: '',
      question: '',
      start: this.getCurrentDateTime()
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(formData) {
    console.log(formData);
    this.discussionService.createDiscussion(formData).subscribe((res: RResponse) => {
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
