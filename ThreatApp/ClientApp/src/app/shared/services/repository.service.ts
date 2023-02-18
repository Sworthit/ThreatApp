import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ThreatDto } from '../interfaces/threat/threatDto';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  public getThreats = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public deleteThreat = (route: string, id: number) => {
    return this.http.delete(this.createCompleteSingleThreatRoute(route, environment.urlAddress, id));
  }

  public createThreat = (route: string, model: ThreatDto) => {

    return this.http.post<ThreatDto>(this.createCompleteRoute(route, environment.urlAddress), JSON.stringify(model), this.generateHeaders());
  }

  private createCompleteRoute = (route: string, urlAddress: string) => {
    return `${urlAddress}/${route}`
  }

  private createCompleteSingleThreatRoute = (route: string, urlAddress: string, id: number) => {
    return `${urlAddress}/${route}/${id}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
