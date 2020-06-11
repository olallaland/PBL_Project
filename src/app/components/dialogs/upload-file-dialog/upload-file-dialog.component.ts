import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {

  uploadFileForm;
  fileToUploadList = [];

  constructor(
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    public formBuilder: FormBuilder,
  ) {
    this.createUploadFileForm();
  }

  ngOnInit(): void {
  }

  createUploadFileForm() {
    this.uploadFileForm = this.formBuilder.group({
      file: null,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
    console.log(files.length);
    // tslint:disable-next-line:forin
    for (let i = 0; i < files.length; i++) {
      console.log(files.item(i));
      this.fileToUploadList.push(files.item(i));
    }
    // this.fileToUpload = files.item(0);
    // console.log(this.fileToUpload);
  }

  onSubmit(formData) {
    // console.log(this.fileToUpload);
  }
}
