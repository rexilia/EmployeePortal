import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';

import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthResponseData, AuthService } from '../login/auth.service';


interface Reason {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  
  selectedValue: string;
  reasons: Reason[] = [
    {value: 'medical-0', viewValue: 'Medical'},
    {value: 'travel-1', viewValue: 'Travel'},
    {value: 'off-2', viewValue: 'Off'}
  ];

  @ViewChild('postForm') leaveform: NgForm;

  constructor(private http: HttpClient,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onCreatePost(postData: {title: string; content: string; email: string; contact: string; from:string; to: string; reason: string;}) {
    this.http.post("https://employee4-6f5cd.firebaseio.com/employeeActivity/employeeLeaveRecords.json",postData).subscribe(responseData => {
      console.log(responseData);
    })
    
    this.leaveform.reset();
    console.log(postData);
  }

  



  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }

}
