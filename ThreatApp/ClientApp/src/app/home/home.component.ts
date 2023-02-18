import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  center: google.maps.LatLngLiteral;
  markers: any[] = [];
  threats: any[] = [];

  constructor(private repository: RepositoryService) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
    this.repository.getThreats('api/threats/all')
      .subscribe(res => {
        console.log("TU NIE", res)
        this.threats = res as [];
        this.addMarker();
      })

  }

  eventHandler(event: any, name: string) {
    console.log(event)
  }

  addMarker() {
    this.threats.forEach(threat => {
      console.log(Number(threat.latitude), Number(threat.longtitude))
      this.markers.push(
        {
        position: {
          lat: Number(threat.latitude),
          lng: Number(threat.longtitude)
        },
        label: {
          color: this.threatColor(threat.level),
          text: threat.description
        },
        title: threat.description,
        info: '',
        options: {
          animation: google.maps.Animation.BOUNCE
        },
      })
      
    });
  }

  threatColor(threatLevel: number) {
    switch(threatLevel) {
      case 1:
        return 'green';
      case 2:
        return 'blue';
      case 3:
        return 'yellow'
      case 4:
        return 'orange'
      case 5:
        return 'red'
    }
    return ''
  }
}

