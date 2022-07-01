import { Injectable } from '@angular/core';
// import { FCM } from '@ionic-native/fcm/ngx';
import { HttpClient } from '@angular/common/http';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {


  constructor(public http: HttpClient, public fcm: FCM, private storage: Storage) { }
  // Get permission from the user
  async getToken(vent_min, vent_max, spotId, numeroSpotChange) {
    let token;
    const is_token = await this.storage.get("token")
    console.log('mon token ', is_token)
    if (is_token == null || is_token == undefined) {
      token = await this.fcm.getToken()
      this.storage.set('token', token);

      const array = [1, 2, 3];
      const index = array.indexOf(spotId);
      if (index > -1) {
        array.splice(index, 1);
      }

      // Post the token to your node server
      this.http.post("http://176.31.162.85:4125/store", { 'token': token, 'vent_min': vent_min, 'vent_max': vent_max, 'spotId': spotId, 'numeroSpot': numeroSpotChange })
        .subscribe(data => {
          console.log(JSON.stringify(data));
        }, error => {
          console.log("err");
          console.log(error);
        });

      for (let i = 0; i < 2; i++) {
        // Post the token to your node server
        this.http.post("http://176.31.162.85:4125/store", { 'token': token, 'vent_min': null, 'vent_max': null, 'spotId': array[i], 'numeroSpot': null })
          .subscribe(data => {
            console.log(JSON.stringify(data));
          }, error => {
            console.log("err");
            console.log(error);
          });
      }

    } else {
      token = is_token
      // Post the token to your node server
      this.http.post("http://176.31.162.85:4125/update", { 'token': token, 'vent_min': vent_min, 'vent_max': vent_max, 'spotId': spotId, 'numeroSpot': numeroSpotChange })
        .subscribe(data => {
          console.log(JSON.stringify(data));
        }, error => {
          console.log("err");
          console.log(error);
        });
    }


  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    alert("bru")
    return this.fcm.onNotification()
  }
}
