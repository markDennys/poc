import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeolocationService } from './geolocation.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceInfoService {
  constructor(
    private location: GeolocationService
  ) {}

  public extractDeviceInfo(body: DeviceInfo): Observable<DeviceInfo> {
    const __body = { ...body };
    return this.location.getLocationAsObservable().pipe(
      switchMap((coords) => {
        __body.latitude = coords.latitude;
        __body.longitude = coords.longitude;
        return of(__body);
      })
    );
  }
}

export class DeviceInfoList {
  deviceInfoList: DeviceInfo[];
}

export class DeviceInfo {
  identificadorDeviceInfo?: number;
  identificadorProposta?: number;
  etapa?: string;
  descricaoDocumento?: string;
  canal?: string;
  ipDevice?: string;
  latitude?: number;
  longitude?: number;
  dataHoraGeolocalizacao?: string;
  imei?: string;
  sistemaOperacional?: string;
  marca?: string;
  modelo?: string;
}

export interface DeviceInfoReneg {
  contractId?: number;
  stepCode?: string;
  latitude?: number;
  longitude?: number;
  deviceIp?: string;
  deviceSystem?: string;
  deviceBrand?: string;
  deviceModel?: string;
}

export enum DeviceInfoRenegStepCode {
  CONTRACT_ACCEPTANCE = 'AAD',
  BIOMETRY_DONE = 'BIO',
}
