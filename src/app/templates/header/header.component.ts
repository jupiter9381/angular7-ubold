import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../service/global.service';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profile_username:any;
  profile_avatar:any;
  
  
  constructor(
    public global: GlobalService
  ) {
    this.global.localeWatch.subscribe(value => {
      this.profile_avatar ="";
			this.ngOnInit();
		})
   }

  ngOnInit() {
    this.profile_username = localStorage.getItem('user_name');
    this.profile_avatar = localStorage.getItem('user_avatar');
  }

  logout(){
    localStorage.clear();

    $.toast({
      heading: "Success", 
      text: 'Log out successfully!', 
      position: 'top-right', 
      bgColor: "#4BB543",
      icon: 'success'
    });
  }

  ngAfterViewInit(){
    $('.button-menu-mobile').on('click', function (event) {
      event.preventDefault();
      $(".nav-second-level").addClass("collapse");
      $("body").toggleClass('sidebar-enable');
      if ($(window).width() >= 768) {
        $("body").toggleClass('enlarged');
      } else {
        $("body").removeClass('enlarged');
      }

      $('.slimscroll-menu').slimscroll({
          height: 'auto',
          position: 'right',
          size: "8px",
          color: '#9ea5ab',
          wheelStep: 5,
          touchScrollStep: 20
      });
    });

  }
}
