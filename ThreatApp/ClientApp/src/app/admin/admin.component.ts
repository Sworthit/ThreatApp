import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public threats: any[] = [];

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    this.getThreats();
  }

  public getThreats = () => {
    this.repository.getThreats('api/threats/all')
    .subscribe(res => {
      this.threats = res as [];
    })
  }

  public deleteThreat = (id: number) => {
    this.repository.deleteThreat('api/threats', id)
    .subscribe(res => {
      this.threats = this.threats.filter((item: any) => item.id != id)
    })
  }
}
