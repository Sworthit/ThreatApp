import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public isUserAuthenticated: boolean;
  public isUserAdmin: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
      if(this.authService.isUserAdmin()){
        this.isUserAdmin = true;
      } else {
        this.isUserAdmin = false;
      }
    });
  }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe((res:any) => {
      this.isUserAuthenticated = res;
    })
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}
