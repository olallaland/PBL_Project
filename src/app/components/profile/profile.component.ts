import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../services/session.service';
import {UserInfo} from '../../entities/UserInfo';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userID;
  user: UserInfo;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    // 限制已登录的用户打开本页面
    if (this.sessionService.get('userID') == null) {
      this.router.navigate(['user/login']);
    }

    console.log(this.activatedRoute.params);
    this.activatedRoute.paramMap.subscribe(params => {
      this.userID = params.get('userID');
    });
    // this.activatedRoute.params.subscribe((data) => {
    //   this.userID = data.userID;
    // });

    console.log('userID: ' + this.userID);

    this.userService.getSingleUser(this.userID).subscribe( (res: UserInfo ) => {
      this.user = res;
    });
  }

}
