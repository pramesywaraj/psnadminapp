import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl: string = 'https://apipestasains.ipb.ac.id/';

  constructor() { }
}
