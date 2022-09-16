import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student.model';
import { UpdateStudent } from '../models/update-student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  //'https://localhost:44312/api/Student/Student';
  private api =  environment.api;

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

  addStudent(studentDto:Student): Observable<Student>{
    const createStudent: UpdateStudent = {
      firstName: studentDto.firstName,
      lastName: studentDto.lastName,
      email: studentDto.email,
      genderId: studentDto.genderId,
      mobile: studentDto.mobile,
      physicalAddress: studentDto.address.physicalAddress,
      postalAddress: studentDto.address.postalAddress,
      dateOfBirth: studentDto.dateOfBirth
    }

    return this.httpClient.post<Student>(this.api+"/api/student/add",createStudent);
  }

  uploadImage(studentId:string,file: File){
    const formData = new FormData();
    formData.append("profileImage",file);

    return this.httpClient.post(this.api+ "/api/student/"+studentId+"/upload-image",formData,{responseType:"text"})
  }

  getImagePath(relativePath: string){
    return `${this.api}/${relativePath}`
  }
}
