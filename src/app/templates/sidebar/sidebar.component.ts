import { Component, OnInit, Input } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() selected: string;
  @Input() subselected: string;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    
  }
}
