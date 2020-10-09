import { Component, OnInit} from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';

import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import {Post} from './post.model';
import { map } from 'rxjs/Operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('postForm') leaveform: NgForm;

  LoadedPosts: Post[] = []

  isAuthenticated = false;
  private userSub: Subscription;

  email: string;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,

  ) { }

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(user => {
      this.email = user.email;
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
      console.log("email",user.email)
    }
    
    )}

  
    onCreatePost(postData: {fname: string; email: string; campus: string; complaint: string;}) {
      this.http.post("https://employee4-6f5cd.firebaseio.com/employeeActivity/RequestDetails.json",postData).subscribe(responseData => {
        console.log(responseData);
        console.log(postData)
       
      })
      //postData.email = this.email
      this.leaveform.reset();
      console.log(postData);
    }


    private fetchPosts(){
      this.http
      .get<{[key: string]: Post}>("https://employee4-6f5cd.firebaseio.com/RequestDetails.json")
      .pipe(
        map(responseData => {
        const postsArray: Post[] =[];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
          postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      })
    )
      .subscribe(posts => {
        this.LoadedPosts = posts
        console.log(posts)
      })
    }




  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}

