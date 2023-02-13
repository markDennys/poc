import { Component, OnInit } from '@angular/core';
import { DeviceInfoService } from './services/device-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private deviceInfoService: DeviceInfoService) {}
  ngOnInit(): void {}

  getLocation() {
    const bodyDevice: any = {
      identificadorProposta: null,
      etapa: 'Aceite termos de uso e privacidade',
    };
    this.deviceInfoService.extractDeviceInfo(bodyDevice).subscribe((data) => {
      console.log(data);
    });
  }
}
