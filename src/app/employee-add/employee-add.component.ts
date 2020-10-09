import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  EmployeeDetails :FormGroup;
  constructor( private afd : AngularFireDatabase ) { }
  ngOnInit(): void {
    this.initialiseForm();
  }
  initialiseForm(){
      this.EmployeeDetails = new FormGroup({
      //$key: new FormControl(null),
      url : new FormControl(''),
      name: new FormControl('',Validators.required),
      dob : new FormControl(''),
      doj : new FormControl(''),
      place : new FormControl(''),
      title:new FormControl('')
    });  
  }
  addNewEmployee(){
   const value = this.EmployeeDetails.value;
   console.log(value);
   this.afd.list('employees').push(value);
  }
}
