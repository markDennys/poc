import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceInfoService } from './services/device-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public errorIos = false;
  public showModal = false;
  public lat:any
  public  lon:any
  constructor(
    private deviceInfoService: DeviceInfoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.iOS();
  }

  getLocation() {
    const bodyDevice: any = {
      identificadorProposta: null,
      etapa: 'Aceite termos de uso e privacidade',
    };
    this.deviceInfoService.extractDeviceInfo(bodyDevice).subscribe(
      (data) => {

        if(!data.latitude && !data.longitude){
          this.showModal = true;
        } else {
          this.lat = data.latitude 
          this.lon = data.longitude
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  reload() {
    document.location.reload();
  }

  iOS() {
    this.errorIos = (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
  }
}
