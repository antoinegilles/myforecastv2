import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public previsionsJour
  spot= "48518"

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    //176.31.162.85
    // console.log("yolo" + this.spot)
    this.http.get("http://176.31.162.85:4125/jour/"+this.spot)
    .subscribe(data => {
      this.previsionsJour = data

      this.addNumber()
    }, error => {
      console.log(error);
    });
  
  }
  dateJour() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let day = dd + '/' + mm + '/' + yyyy;

    return day
  }

  addNumber(){
    this.previsionsJour.forEach(element => {
      if (parseInt(element.aujourdhui) < 10) {
       element.aujourdhui = ('0' + element.aujourdhui).slice(-2)
     }
   })
  }

  couleur(value) {
    if (value <= 10) {

      let object = { "color": 'white', 'background-color': 'rgba(195 175 175 / 22%)' }
      return object
    } else if (value <= 15 && value > 10) {
      let object = { "color": '#3880ff', 'background-color': 'rgba(56, 128, 255,0.1)'  }
      return object
    } else if (value <= 15 && value > 10) {
      let object = { "color": '#2dd36f', 'background-color': 'rgba(45, 211, 111,0.1)'  } 
      return object
    } else if (value <= 20 && value > 15) {
      let object = { "color": '#ffc409', 'background-color': 'rgba(255, 196, 9,0.1)' }
      return object
    } else if (value > 20) {
      let object = { "color": '#eb445a', 'background-color': 'rgba(235, 68, 90,0.1)' }
      return object
    }
  }

}
