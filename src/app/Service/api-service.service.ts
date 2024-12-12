import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient : HttpClient) { }

  public getDummyData():Observable<any> {
    return this.httpClient.get('../../assets/Api/dummyApi.json')
  }
}
