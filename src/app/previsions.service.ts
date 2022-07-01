import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrevisionsService {

  constructor(public http: HttpClient) { }

  async getPrevisionsJour() {
    
      this.http.get("http://176.31.162.85:4125/jour")
        .subscribe(data => {
          console.log(data)
          return data
        }, error => {
          console.log(error);
        });
  }
  async getPrevisionsDeamin() {
    
      this.http.get("http://176.31.162.85:4125/demain")
        .subscribe(data => {
          return data
        }, error => {
          console.log(error);
        });
  }
}
