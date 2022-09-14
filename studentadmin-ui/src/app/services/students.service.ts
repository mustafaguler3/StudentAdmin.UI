import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  //'https://localhost:44312/api/Student/Student';
  private api = 'https://localhost:44312';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.api + "/api/student/student");
  }
}
