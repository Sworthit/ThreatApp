import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThreatLevelValidatorService } from '../shared/custom-validators/threat-level-validator.service';
import { Threat } from '../shared/interfaces/threat/threat';
import { ThreatDto } from '../shared/interfaces/threat/threatDto';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
  selector: 'app-add-threat',
  templateUrl: './add-threat.component.html',
  styleUrls: ['./add-threat.component.css']
})
export class AddThreatComponent implements OnInit {
  center: google.maps.LatLngLiteral;
  public threatForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  markers: any[] = [];
  Levels: number[] = [1,2,3,4,5];

  constructor(private repository: RepositoryService, private router: Router) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
    this.threatForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longtitude: new FormControl('', [Validators.required]),
      level: new FormControl('')
    });
    this.threatForm.get('level')?.
    setValidators([Validators.required, ThreatLevelValidatorService.levelValidator({min: 1, max: 5})])
  }

  public validateControl = (controlName: string) => {
    return this.threatForm.get(controlName)?.invalid && this.threatForm.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.threatForm.get(controlName)?.hasError(errorName)
  }

  eventHandler(event: any, name: string) {
    if (name === 'mapDblclick') {
      this.addMarker(event)
    }
  }

  addMarker(event: any) {
    
    this.markers.push({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },

      title: 'New Threat',
      info: 'Marker info',
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    })
    this.threatForm.get('latitude')?.setValue(event.latLng.lat());
    this.threatForm.get('longtitude')?.setValue(event.latLng.lng());

    if(this.markers.length > 1) {
      this.markers.shift();
    }
  }

  addThreat(threatFormValue: any) {
    this.showError = false;
    const formValues = { ...threatFormValue};
    console.log(formValues)
    const threat: ThreatDto = {
      description: formValues.description,
      longtitude: formValues.longtitude,
      latitude: formValues.latitude,
      level: formValues.level
    }
    this.repository.createThreat('api/threats/add', threat)
      .subscribe({
        next: (_) => this.router.navigate(['/']),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message
          this.showError = true;
        }
      })
  }

}
