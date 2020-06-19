import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {CourseInfo} from '../../../entities/CourseInfo';
import {ProjectService} from '../../../services/project.service';
import {RResponse} from '../../../entities/RResponse';
import {ToastrService} from 'ngx-toastr';

export interface ScoreInfo {
  courseID: string;
  projectID: string;
  studentID: string;
}

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
    @Inject(MAT_DIALOG_DATA) public data: ScoreInfo,
    private projectService: ProjectService,
    private toastrService: ToastrService
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
      course_id: this.data.courseID,
      project_id: this.data.projectID,
      student_id: this.data.studentID,
      mission_score: 0,
      other_score: 0,
      scored: 'true'
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(scoreData) {
    console.log(scoreData);
    // 删除文件
    this.projectService.scoreStudent(scoreData).subscribe((res: RResponse) => {
      console.log(res);
      if (res.code === 200) {
        this.toastrService.success('评分成功', '', {
          timeOut: 1500,
        });

        this.dialogRef.close();
      } else {
        this.toastrService.error(res.msg, '评分失败', {
          timeOut: 1500,
        });
      }

    });
  }
}
