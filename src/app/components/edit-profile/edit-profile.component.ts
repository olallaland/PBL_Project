import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {UserInfo} from '../../entities/UserInfo';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userID;
  user;
  editUserInfoForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // 获得url中的 user ID
    this.activatedRoute.params.subscribe((data) => {
      console.log(data);
      this.userID = data.userID;
    });

    // 获得user信息
    this.userService.getSingleUser(this.userID).subscribe( (res: UserInfo ) => {
      this.user = res;

    });

    // init form
    this.initForm();
  }

  onSubmit(data) {
    console.log(this.editUserInfoForm);
  }

  initForm() {
    this.editUserInfoForm = this.formBuilder.group({
      username: '',
      password: '',
      name: '',
      gender: '',
      picture: ''
    });

    console.log(this.editUserInfoForm);
  }

  // preview selected picture
  preview(event) {
    let file;
    if (event.target.files[0]) {
      // tslint:disable-next-line:no-shadowed-variable
      file = event.target.files[0];
      console.log(file);
      console.log('file.size = ' + file.size);
      // obj.file = file;
    }
    this.user.picture = file;

    // file.size 单位为byte
    const reader = new FileReader();
    // 读取文件过程方法
    // tslint:disable-next-line:only-arrow-functions
    reader.onloadstart = function(e) {
      console.log('开始读取....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onprogress = function(e) {
      console.log('正在读取中....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onabort = function(e) {
      console.log('中断读取....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onerror = function(e) {
      console.log('读取异常....');
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = function(e) {
      console.log('成功读取....');

      const img = document.getElementById('imgPreview');
      if (typeof e.target.result === 'string') {
        img.setAttribute('src', e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }

}
