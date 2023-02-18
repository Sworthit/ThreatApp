import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/response/authResponse';
import { RegistrationResponseDto } from '../interfaces/response/response';
import { AuthenticationUser } from '../interfaces/user/authenticationUser';
import { UserForRegistrationDto } from '../interfaces/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSubject = new Subject<boolean>();
  public authChanged = this.authChangeSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  
  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, environment.urlAddress), body);
  }

  public loginUser = (route: string, body: AuthenticationUser) => {
    return this.http.post<AuthResponse>(this.createCompleteRoute(route, environment.urlAddress), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSubject.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    if (token != null){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Administrator';
    }
    return false;
  }

  private createCompleteRoute = (route: string, urlAddress: string) => {
    return `${urlAddress}/${route}`
  }
}
