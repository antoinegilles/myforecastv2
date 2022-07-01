import { Component } from '@angular/core';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { FcmService } from '../fcm.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  vent_min1 = 0
  vent_max1 = 0
  vent_min2 = 0
  vent_max2 = 0
  vent_min3 = 0
  vent_max3 = 0
  spot1 = null
  spot2 = null
  spot3 = null


  constructor(public fcm: FCM, public fcmService: FcmService, private storage: Storage, public toastController: ToastController) {

    this.init();
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
  }
  async ngOnInit() {

    const vent_min1 = await this.storage.get("vent_min1")
    const vent_max1 = await this.storage.get("vent_max1")
    const spot1 = await this.storage.get("spot1")
    const vent_min2 = await this.storage.get("vent_min2")
    const vent_max2 = await this.storage.get("vent_max2")
    const spot2 = await this.storage.get("spot2")
    const vent_min3 = await this.storage.get("vent_min3")
    const vent_max3 = await this.storage.get("vent_max3")
    const spot3 = await this.storage.get("spot3")

    console.log(vent_max1)
    console.log(vent_min1)

    if (vent_max1 == undefined || vent_max1 == null && vent_min1 == undefined || vent_min1 == null) {
      console.log("aucune donnée")

    } else {
      console.log('vent_max trouvé : ', vent_max2)
      this.vent_min1 = vent_min1
      this.vent_max1 = vent_max1
      this.spot1 = spot1

    }
    if (vent_max2 == undefined || vent_max2 == null && vent_min2 == undefined || vent_min2 == null) {
      console.log("aucune donnée")

    } else {
      console.log('vent_max trouvé : ', vent_max2)
      this.vent_min2 = vent_min2
      this.vent_max2 = vent_max2
      this.spot2 = spot2

    }
    if (vent_max3 == undefined || vent_max3 == null && vent_min3 == undefined || vent_min3 == null) {
      console.log("aucune donnée")

    } else {
      console.log('vent_max trouvé : ', vent_max3)
      this.vent_min3 = vent_min3
      this.vent_max3 = vent_max3
      this.spot3 = spot3

    }

  }

  saveInformations(spotId) {
    let numeroVentMin;
    let numeroVentMax;
    let ventMax;
    let ventMin;
    let spot = null;
    let nomSpot;
    switch (spotId) {
      case 1:
        ventMax = this.vent_max1
        ventMin = this.vent_min1
        numeroVentMin = "vent_min1"
        numeroVentMax = "vent_max1"
        spot = this.spot1
        nomSpot = "spot1"
          break;
      case 2:
        ventMax = this.vent_max2
        ventMin = this.vent_min2
        numeroVentMin = "vent_min2"
        numeroVentMax = "vent_max2"  
        spot = this.spot2  
        nomSpot = "spot2"      
        break;
      case 3:
        ventMax = this.vent_max3
        ventMin = this.vent_min3
        numeroVentMin = "vent_min3"
        numeroVentMax = "vent_max3"
        spot = this.spot3
        nomSpot = "spot3"
        break;
  }

    if (ventMax <= 0 || ventMin <= 0 || spot == null) {

      this.presentToast("Veuillez rentrer des valeurs corrects...", "danger")
    } else {
      let spotChangement;

      if (spotId == 1) {
        spotChangement = this.spot1
      } else if (spotId == 2) {
        spotChangement = this.spot2
      } else {
        spotChangement = this.spot3
      }

      this.fcmService.getToken(ventMin, ventMax, spotId, spotChangement).then((response) => {
        // console.log(response)
        this.presentToast("Informations enregistrées", "success")
      }).catch(() => {
        this.presentToast("Une erreur est survenue, veuillez contacter le développeur", "danger")
      })

      // console.log(ventMax)
      // console.log(ventMin)
      // console.log(numeroVentMin)
      // console.log(numeroVentMax)
      this.storage.set(numeroVentMin, ventMin);
      this.storage.set(numeroVentMax, ventMax);
      this.storage.set(nomSpot, spot);

      // const vent_min = this.storage.get(numeroVentMin)
      // const vent_max = this.storage.get(numeroVentMax)
      
    }
  }

}
