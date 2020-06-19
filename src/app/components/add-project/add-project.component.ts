import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {SessionService} from '../../services/session.service';
import {ToastrService} from 'ngx-toastr';
import {RResponse} from '../../entities/RResponse';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  addPJForm;
  courseID;
  startDate;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    // 获得url中的 courseID ID
    this.activatedRoute.params.subscribe((data) => {
      this.courseID = data.courseID;
      console.log('inner course id: ' + this.courseID);
    });

    this.startDate = this.getCurrentDate();

    this.createAddPJForm();
  }

  createAddPJForm() {
    this.addPJForm = this.formBuilder.group({
      course_id: this.courseID,
      pj_id: '',
      name: '',
      describe: '',
      start: this.startDate,
      end: ''
    });
  }

  /**
   * 获取当前时间并格式化，作为项目开始时间
   */
  getCurrentDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    let curDateTime = '';

    if (month < 10) {
      curDateTime = date.getFullYear() + '-' + '0' + month + '-' + date.getDate();
    } else {
      curDateTime = date.getFullYear() + '-' + month + '-' + date.getDate();
    }
    console.log(curDateTime);
    return curDateTime;
  }

  onSubmit(pjData) {
    console.log(pjData);
    console.log('submit');

    this.projectService.createProject(pjData).subscribe((response: RResponse) => {
      console.log(response);
      if (response.code === 200) {
        // 创建成功，弹出提示框
        this.toastrService.success('创建成功', '', {
          timeOut: 1500,
        });

        // 创建成功，跳转到课程列表
        this.router.navigate(['/course/details', this.courseID]);
      } else {
        // 创建失败，弹出提示框
        this.toastrService.error(response.msg, '创建失败', {
          timeOut: 1500,
        });
      }
    });
  }
}
