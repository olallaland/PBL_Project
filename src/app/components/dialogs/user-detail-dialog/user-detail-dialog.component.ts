import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserInfo} from '../../../entities/UserInfo';
import {SessionService} from '../../../services/session.service';
import {RResponse} from '../../../entities/RResponse';
import {ToastrService} from 'ngx-toastr';
import {UserManagementService} from '../../../services/user-management.service';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    public sessionService: SessionService,
    private toastrService: ToastrService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    console.log('user details dialog: ' + this.data);
    console.log(this.data.user_type + ' + ' + this.data.user_id);
  }


  deleteUser(type, userID) {
    this.userManagementService.deleteUser(type, userID).subscribe((response: RResponse) => {
      console.log(response);
      if (response.code === 200) {
        this.toastrService.success('删除成功', '', {
          timeOut: 1500,
        });

        window.location.reload();
      } else {
        this.toastrService.error(response.msg, '删除失败', {
          timeOut: 1500,
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
