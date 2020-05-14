import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  tabs = [];
  contents = [];
  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.tabs = this.elementRef.nativeElement.querySelectorAll('.sidebar-row');
    this.contents = this.elementRef.nativeElement.querySelectorAll('.tab-content');
    console.log(this.tabs);
    console.log(this.contents);
  }

  changeTab(index) {
    console.log(index);
    // console.log(this.tabs);
    // console.log(this.contents);
    // console.log(this.tabs[index]);
    // console.log(this.contents[index]);
    for (let i = 0; i < this.tabs.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (i == index) {
        this.contents[i].className = 'tab-content current-tab';
        this.tabs[i].className = 'mat-toolbar-row sidebar-row selected';
      } else {
        this.contents[i].className = 'tab-content';
        this.tabs[i].className = 'mat-toolbar-row sidebar-row';
      }
    }
  }
}
