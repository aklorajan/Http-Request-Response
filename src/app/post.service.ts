import {Post} from "./post.model"
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  errorMessage = new Subject()

  constructor(private http: HttpClient) {
  }
   createAndStoreData(postData: Post){
    // Send Http request
    this.http.post<Post>('https://seventh-acronym-226311-default-rtdb.firebaseio.com/posts.json', postData,
      {
        headers: new HttpHeaders({'custom-header': 'prehgfhjtty'}),
        params: new HttpParams().set('auth ','CREDENTIAL'),
        observe: 'response'
      }
      ).subscribe(postData=> {
      console.log(postData);

    },error => {
      const err = null;
      for (const i in error)
      this.errorMessage.next(error.error[i])
    })
  }
  fetchData(){

    // Send Http request
   return  this.http.get<Post>('https://seventh-acronym-226311-default-rtdb.firebaseio.com/posts.json').pipe(map(data => {
      const postArray = []
      for (let i in  data){
        postArray.push({...data[i], id:i})
      }
      return postArray
    }), catchError(err => {
      return throwError(err)
     })
   )
  }
  deletePosts(){
   return this.http.delete('https://seventh-acronym-226311-default-rtdb.firebaseio.com/posts.json')
  }
}
