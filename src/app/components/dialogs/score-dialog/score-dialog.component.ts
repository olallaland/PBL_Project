import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css']
})
export class ScoreDialogComponent implements OnInit {

  gradeForm;
  constructor(
    public dialogRef: MatDialogRef<ScoreDialogComponent>,
    public formBuilder: FormBuilder,
  ) {
    this.createGradeForm();
  }

  ngOnInit(): void {
  }

  /**
   * 初始化gradeForm
   */
  createGradeForm() {
    this.gradeForm = this.formBuilder.group({
      discussScore: '',
      taskScore: '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(scoreData) {

  }
}
