import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from "./post.model";
import {PostService} from "./post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error =null;

  constructor(private http: HttpClient, private postService: PostService ) {}

  ngOnInit() {
    this.postService.errorMessage.subscribe(error=>{
      this.error=error
    })
    this.isFetching = true
    this.postService.fetchData().subscribe(posts=> {
    this.isFetching = false
      this.loadedPosts=posts
    }, error => {
      for (const i in error)
      this.error = error.error[i];
      console.log(error)
    })
  }

  onCreatePost(postData: Post) {
  this.postService.createAndStoreData(postData)
  }

  onFetchPosts() {
    this.postService.fetchData().subscribe(posts=> {
      this.loadedPosts=posts
    }, error => {
      for (const i in error)
        this.error = error.error[i];
      console.log(error)
    })
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(posts=> {
      this.loadedPosts = []
    })
  }
  errorHandling(){
    this.error = null
  }
}
