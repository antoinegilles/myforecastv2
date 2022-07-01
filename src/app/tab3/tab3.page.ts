import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public previsionsDemain
  spot = "48518"
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.http.get("http://176.31.162.85:4125/demain/"+this.spot)
    .subscribe((data) => {
      console.log(data)
      this.previsionsDemain = data
      this.addNumber()
    }, error => {
      console.log(error);
    });
  }
  addNumber(){
    this.previsionsDemain.forEach(element => {
      if (parseInt(element.demain) < 10) {
       element.demain = ('0' + element.demain).slice(-2)
       console.log(element)
     }
   })
  }
  couleur(value) {
    if (value <= 10) {

      let object = { "color": 'white', 'background-color': 'rgba(195 175 175 / 22%)' }
      return object
    } else if (value <= 15 && value > 10) {
      let object = { "color": '#3880ff', 'background-color': 'rgba(56, 128, 255,0.1)' }
      return object
    } else if (value <= 15 && value > 10) {
      let object = { "color": '#2dd36f', 'background-color': 'rgba(45, 211, 111,0.1)' }
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
