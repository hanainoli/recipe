
import {Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import {map,tap} from 'rxjs/operators'
@Injectable({providedIn:'root'})
export class PostsService{

    constructor(private http: HttpClient){

    }
createAndStorePost(title:string,content:string){
    const postData : Post ={title:title,content:content};
    const headers = new HttpHeaders( {'My-Custom-Header': 'foobar'});
  //
  this.http.post<{name: string}>(
    'https://angular-first-19c4c-default-rtdb.firebaseio.com/posts.json',
   
     postData,
     {headers}
 ).pipe(tap( events => {
        console.log(events);
     }))
     .subscribe(
      responsedata =>{
        console.log(responsedata);
      }
    );
}
fetchPosts(isFetching:boolean){
  //  loadedPosts: Post[] =[];
    this.http.
    get<{[key:string]:Post}>('https://angular-first-19c4c-default-rtdb.firebaseio.com/posts.json').
    pipe(map(responseData=>{
        const postArray: Post[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push( { ...responseData[key], id:key});
          }
         
        }
        return postArray;
    })).
    subscribe(
          (posts)=>{
            // isFetching = false;
            // console.log(posts);
            // loadedPosts = posts;
          }
    );
}
}