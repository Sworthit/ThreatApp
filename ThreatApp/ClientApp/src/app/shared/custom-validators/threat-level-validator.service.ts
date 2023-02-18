import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ThreatLevelValidatorService {

  constructor() { }

  static levelValidator = (prms: any): ValidatorFn => {
    return (control: any): {[key: string]: boolean } | null => {
      let val: number = control.value
      if(isNaN(val) || /\D/.test(val.toString())) {
        
        return {"number": true};
      } else if(!isNaN(prms.min) && !isNaN(prms.max)) {
        
        return val < prms.min || val > prms.max ? {"number": false} : null;
      } else if(!isNaN(prms.min)) {
        
        return val < prms.min ? {"number": true} : null;
      } else if(!isNaN(prms.max)) {
        
        return val > prms.max ? {"number": true} : null;
      } else {
        
        return null;
      }
    }
  }
}
