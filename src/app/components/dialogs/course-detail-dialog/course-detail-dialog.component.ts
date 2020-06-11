import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CourseInfo} from '../../../entities/CourseInfo';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-course-detail-dialog',
  templateUrl: './course-detail-dialog.component.html',
  styleUrls: ['./course-detail-dialog.component.css']
})
export class CourseDetailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CourseDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseInfo,
    public sessionService: SessionService
  ) { }

  ngOnInit(): void {
    console.log('course details dialog: ' + this.data);
    console.log(this.data.course_id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
