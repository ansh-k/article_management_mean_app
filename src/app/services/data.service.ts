import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable()
export class DataService {
  result: any;

  constructor(private _http: Http) { }
  
  getArticles() {
    return this._http.get('/api/articles')
    .pipe(
      map(result => this.result = result.json().data),
      catchError((err) => {
        let error = JSON.parse(err._body);
        return throwError(error.message);
      })
    );
  }

  saveArticle(data) {
    if(!data._id) {
      return this._http.post('/api/article', data)
      .pipe(
        map(result => this.result = result.json().data),
        catchError((err) => {
          let error = JSON.parse(err._body);
          return throwError(error.message);
        })
      );
    } else {
      return this._http.put('/api/article/'+data._id, data)
      .pipe(
        map(result => this.result = result.json().data),
        catchError((err) => {
          let error = JSON.parse(err._body);
          return throwError(error.message);
        })
      );
    }
  }
  
}
