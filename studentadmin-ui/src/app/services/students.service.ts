import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { UpdateStudent } from '../models/update-student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  //'https://localhost:44312/api/Student/Student';
  private api = 'https://localhost:44312';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.api + "/api/student/all");
  }

  getStudent(studentId:string): Observable<Student> {
    return this.httpClient.get<Student>(this.api+"/api/student/"+studentId);
  }

  updateStudent(studentId:string, updateStudent: Student): Observable<Student>{
    const update: UpdateStudent = {
      firstName: updateStudent.firstName,
      lastName: updateStudent.lastName,
      email: updateStudent.email,
      genderId: updateStudent.genderId,
      mobile: updateStudent.mobile,
      physicalAddress: updateStudent.address.physicalAddress,
      postalAddress: updateStudent.address.postalAddress,
      dateOfBirth: updateStudent.dateOfBirth
    }

    return this.httpClient.put<Student>(this.api+"/api/student"+studentId,update);
  }

  deleteStudent(studentId: string): Observable<Student>{
    return this.httpClient.delete<Student>(this.api+"/api/student/"+studentId);
  }
}
