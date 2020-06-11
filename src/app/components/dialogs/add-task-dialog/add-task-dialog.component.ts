import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})

export class AddTaskDialogComponent implements OnInit {

  addTaskForm;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    public formBuilder: FormBuilder,
  ) {
    this.addTaskForm = this.formBuilder.group({
      name: '',
      startDate: '',
      endDate: '',
      priority: 0,
      intro: 'fdaa'
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(taskData) {

  }
}