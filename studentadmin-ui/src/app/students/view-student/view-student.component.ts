import { Gender } from './../../ui-models/gender.model';
import { StudentsService } from './../../services/students.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null | undefined;

  student: Student = {
    id:"",
    firstName:"",
    lastName:"",
    dateOfBirth:"",
    email:"",
    mobile:"",
    genderId:"",
    profileImageUrl:"",
    gender:{
      id:"",
      description:""
    },
    address: {
      id:"",
      physicalAddress:"",
      postalAddress:""
    }
  }

  genderList : Gender[] = []

  constructor(
    private readonly studentService: StudentsService,
    private readonly route:ActivatedRoute,
    private readonly genderService:GenderService,
    private snackbar: MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get("id")
      
        if(this.studentId){
          this.studentService.getStudent(this.studentId).subscribe(
            (success) =>{
              this.student = success;
            }
          );


          this.genderService.getGenderList().subscribe(success => {this.genderList = success});
        }
      }

        
    )
  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (success) => {this.snackbar.open("Student update successfully",undefined,{duration:2000})},
      (err) => {console.log(err)});
  }

  onDelete():void{
    this.studentService.deleteStudent(this.student.id).subscribe(
      (success) => {
        this.snackbar.open("Student deleted",undefined,{duration:2000})
        
        setTimeout(()=>{
          this.router.navigateByUrl("students")
        },2000)
        
      });

      
  }

}
