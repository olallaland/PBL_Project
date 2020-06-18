import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {CourseInfo} from '../../../entities/CourseInfo';
import {SessionService} from '../../../services/session.service';
import {FileService} from '../../../services/file.service';
import {RResponse} from '../../../entities/RResponse';
import {ToastrService} from 'ngx-toastr';

export interface ProjectIdentify {
  courseID: string;
  projectID: string;
}


@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {

  uploadFileForm;
  fileToUploadList = [];
  fileToUpload;

  constructor(
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public referData: ProjectIdentify,
    private sessionService: SessionService,
    private fileService: FileService,
    private toastrService: ToastrService
  ) {
    this.createUploadFileForm();
  }

  ngOnInit(): void {
  }

  createUploadFileForm() {
    this.uploadFileForm = this.formBuilder.group({
      file: null,
      desc: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
    console.log(files.length);
    this.fileToUpload = files.item(0);
    // tslint:disable-next-line:forin
    for (let i = 0; i < files.length; i++) {
      console.log(files.item(i));
      this.fileToUploadList.push(files.item(i));
    }
    // this.fileToUpload = files.item(0);
    // console.log(this.fileToUpload);
  }

  onSubmit(data) {

    console.log('submit');
    const formData = new FormData();
    const date = new Date();
    const month = date.getMonth() + 1;
    console.log(date.getFullYear() + '-' + month + '-' + date.getDate());
    const formatDate = date.getFullYear() + '-' + month + '-' + date.getDate();
    // formData.append('type', 'student');
    formData.append('course_id', this.referData.courseID);
    formData.append('pj_id', this.referData.projectID);
    formData.append('user_id', this.sessionService.get('userID'));
    formData.append('date', formatDate);
    formData.append('file', this.fileToUpload);
    formData.append('description', data.desc);
   //  formData.append('upload_date', new Date());
    // console.log(this.fileToUpload);

    this.fileService.uploadFile(formData).subscribe((response: RResponse) => {
      if (response.code === 200) {
        // 上传成功，弹出提示框
        this.toastrService.success('上传成功', '', {
          timeOut: 1500,
        });

        // 关闭弹窗
        this.dialogRef.close();
      } else {
        // 上传成功，弹出提示框
        this.toastrService.error(response.msg, '上传失败', {
          timeOut: 2000,
        });
      }
    });
  }
}
