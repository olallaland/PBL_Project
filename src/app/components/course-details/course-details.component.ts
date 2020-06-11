import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ProjectDetailDialogComponent} from '../dialogs/project-detail-dialog/project-detail-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SessionService} from '../../services/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  projectList = [];
  courseID;
  courseInfo;
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    public sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    // 获得url中的 user ID
    this.activatedRoute.params.subscribe((data) => {
      this.courseID = data.courseID;
      console.log('inner course details: ' + this.courseID);
    });

    console.log('course details: ' + this.courseID);

    // 根据course ID 获得课程信息
    this.courseService.getCourseByID(this.courseID).subscribe( (res ) => {
      this.courseInfo = res;
      console.log(this.courseInfo);
    });

    // 根据course ID 获得pj list信息
    this.projectService.getProjectList(this.courseID).subscribe( (res: [] ) => {
      this.projectList = res;
      console.log(this.projectList);
    });
  }

  openDialog(index): void {
    const dialogRef = this.dialog.open(ProjectDetailDialogComponent, {
      // width: '700px',
      // height: '450px',
      data: {
        pj_id: this.projectList[index].pj_id,
        name: this.projectList[index].name,
        start_time: this.projectList[index].start_time,
        end_time: this.projectList[index].end_time,
        desc: this.projectList[index].desc,
        count: this.projectList[index].count
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
