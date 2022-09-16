import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/gender.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private api = environment.api+"/api/Gender/all"

  constructor(private httpClient:HttpClient) { }

  getGenderList() : Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.api)
  }
}
