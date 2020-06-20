import {Component, Inject, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../services/session.service';
import {UserService} from '../../services/user.service';
import {SuccessfulResponse} from '../../entities/SuccessfulResponse';
import {User} from '../../entities/User';
import {RResponse} from '../../entities/RResponse';
import {filterErrorsAndWarnings} from '@angular/compiler-cli';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userID;
  user;
  serviceUrl;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    @Inject('BASE_CONFIG') serviceUrl
  ) {
    this.serviceUrl = serviceUrl;
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

    this.initUser(this.userID);

  }

  initUser(userID) {
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.userService.getSingleUser(this.userID).subscribe(async function(res: RResponse) {
      console.log('dd');
      that.user = await res.data;
      console.log('mm');
      // tslint:disable-next-line:only-arrow-functions
    }, function(err) {
      console.log(err);
    });
    console.log('gg');
  }

}
