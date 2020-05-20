import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  addCourseForm;

  constructor(
    public formBuilder: FormBuilder,
    private sessionService: SessionService
  ) {
    this.createAddCourseForm();
  }

  ngOnInit(): void {
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
