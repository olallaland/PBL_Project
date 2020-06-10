import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    public sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.remove('userID');
    this.sessionService.remove('userIdentity');
  }
}
