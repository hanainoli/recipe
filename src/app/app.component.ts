import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = true;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    console.log(postData);
    // Send Http request
   this.postService.createAndStorePost(postData.title,postData.content);

  }

  onFetchPosts() {
    this.fetchPosts();
   
  }

  private fetchPosts(){
    this.postService.fetchPosts(this.isFetching);
  }

  onClearPosts() {
    // Send Http request
  }
}
