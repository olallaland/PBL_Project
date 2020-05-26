import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  addCourseForm;

  constructor(
    public formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.createAddCourseForm();
  }

  ngOnInit(): void {
    // 限制未登录的用户打开本页面
    if (this.sessionService.get('user') == null) {
      this.router.navigate(['user/login']);
    }
  }

  createAddCourseForm() {
    this.addCourseForm = this.formBuilder.group({
      name: '',
      teacher: [{value: this.sessionService.get('user'), disabled: true}],
      intro: '',
      classTime: ''
    });
  }

  onSubmit(courseData) {

  }
}
