import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../course-details/course-details.component';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-create-discussion-dialog',
  templateUrl: './create-discussion-dialog.component.html',
  styleUrls: ['./create-discussion-dialog.component.css']
})
export class CreateDiscussionDialogComponent implements OnInit {

  newDiscussionForm;

  constructor(
    public dialogRef: MatDialogRef<CreateDiscussionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formBuilder: FormBuilder,
  ) {
    this.createNewDiscussionForm();
  }

  ngOnInit(): void {
  }

  createNewDiscussionForm() {
    this.newDiscussionForm = this.formBuilder.group({
      topic: '',
      content: '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(formData) {

  }
}
