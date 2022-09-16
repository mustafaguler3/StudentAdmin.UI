import { Gender } from './../../ui-models/gender.model';
import { StudentsService } from './../../services/students.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

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

  isNewStudent = false;
  header = "";
  displayProfileImageUrl = "";

  @ViewChild("studentDetailsForm") studentDetailsForm ?: NgForm

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
          if(this.studentId.toLowerCase() === "Add".toLowerCase()){
            //->new Student functionality
            this.isNewStudent = true;
            this.header = "Add New Student";
            this.setImage();
          }else {
            this.isNewStudent = false;
            this.header = "Edit Student";
            this.studentService.getStudent(this.studentId).subscribe(
              (success) =>{
                this.student = success;
                this.setImage();
              },
              (err)=>{
                this.setImage();
              }
            );
          }
          this.genderService.getGenderList().subscribe(success => {this.genderList = success});
        }

          
        
      }

        
    )
  }

  uploadImage(event: any) :void {
    if(this.studentId){
      const file = event.target.files[0];
      this.studentService.uploadImage(this.student.id,file).subscribe(
        (success) => {
          this.student.profileImageUrl = success;
          this.setImage();

          this.snackbar.open("Profile image updated",undefined,{duration:2000})
        },
        (err) => {

        }
      )
    }
  }

  private setImage():void {
    if(this.student.profileImageUrl){
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
    }else {
      this.displayProfileImageUrl = "/assets/user.png";
    }
  }

  onUpdate(): void {
    if(this.studentDetailsForm?.form.valid){
      this.studentService.updateStudent(this.student.id,this.student)
      .subscribe(
        (success) => {this.snackbar.open("Student update successfully",undefined,{duration:2000})},
        (err) => {console.log(err)});
    }
    
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

  onAdd():void {

    if(this.studentDetailsForm?.form.valid){
      this.studentService.addStudent(this.student).subscribe((success) => {
        this.snackbar.open("Student added successfully",undefined,{duration:2000})
      });
  
      setTimeout(()=>{
        this.router.navigateByUrl("student");
      },2000)
    }

    
  }
}
