import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import {Post} from './post.model';
import { ViewChild } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { User } from '../login/user.model';



//console.log(AuthService)

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  @ViewChild('postForm') meets: NgForm;



  LoadedPosts: Post[] = []

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost(PostData: Post) {
    this.http.post<{meeting: String}>("https://employee4-6f5cd.firebaseio.com/employeeActivity/employeeMeetings.json",PostData).subscribe(responseData => {
      console.log(responseData);
  
    })
    //console.log('test',AuthService)
    console.log(PostData);
    this.meets.reset();
  }

  //details







  

  onFetchPosts() {
    this.fetchPosts();
    // Send Http request
  }

  onClearPosts() {
    this.deletePosts().subscribe(()=> {
      this.LoadedPosts =[];
    });
    // Send Http request
  }

  private fetchPosts(){
    this.http
    .get<{[key: string]: Post}>("https://employee4-6f5cd.firebaseio.com/employeeActivity/employeeMeetings.json")
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
      //console.log(posts)
    })
  }

  deletePosts(){
    return this.http.delete("https://employee4-6f5cd.firebaseio.com/employeeActivity/employeeMeetings.json")
  }

}

