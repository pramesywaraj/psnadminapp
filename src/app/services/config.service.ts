import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl: string = 'http://api.pestasains.ipb.ac.id/';

  constructor() { }
}
