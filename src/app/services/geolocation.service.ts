import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        err => {
          resolve({ lng: '', lat: '' });
        }
      );
    });
  }



  getLocationAsObservable(): Observable<any> {
    return Observable.create((observer:any) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position.coords);
          observer.complete();
        },
        error => {
          observer.next({ lng: '', lat: '' });
          observer.complete();
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    });
  }

 
}
