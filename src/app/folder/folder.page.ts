import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { MenuController, ModalController } from '@ionic/angular';
import { TestPage } from '../test/test.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }

  public async initMap() {
    await CapacitorGoogleMaps.initialize({
      key: 'MAPS_API_KEY',
      devicePixelRatio: window.devicePixelRatio, // this line is very important
    });

    const element = document.getElementById('container');
    const boundingRect = element.getBoundingClientRect();
    try {
      //@ts-ignore
      const result = await CapacitorGoogleMaps.createMap({
        boundingRect: {
          width: Math.round(boundingRect.width),
          height: Math.round(boundingRect.height),
          x: Math.round(boundingRect.x),
          y: Math.round(boundingRect.y),
        },
        //@ts-ignore
        cameraPosition: {
          target: {
            latitude: 46.63665,
            longitude: 14.54722,
          },
        },
        preferences: {
          //@ts-ignore
          appearance: {
            isMyLocationDotShown: true,
          },
        },
      });

      // remove background, so map can be seen
      element.style.background = 'transparent';

      // finally set `data-maps-id` attribute for delegating touch events
      element.setAttribute('data-maps-id', result.googleMap.mapId);

      CapacitorGoogleMaps.addMarker({
        mapId: result.googleMap.mapId,
        position: {
          latitude: 46.63665,
          longitude: 14.54722,
        },
        preferences: {
          //@ts-ignore
          position: {
            latitude: 46.63665,
            longitude: 14.54722,
          },
        },
      });
      console.log('success');
    } catch (e) {
      console.log('error', e);
    }
  }

  public onOpenMenu() {
    this.menuController.toggle();
  }

  public onButtonClick() {
    console.log('click');
  }

  public async onOpenModal() {
    const modal = await this.modalController.create({
      component: TestPage,
      swipeToClose: true,

      //presentingElement: document.querySelector('ion-router-outlet'),
      // @ts-ignore
      breakpoints: [0.25, 0.5, 1],
      initialBreakpoint: 0.5,
      backdropDismiss: false,
      cssClass: 'sheet-modal-example',
    });

    await this.menuController.close();
    return modal.present();
  }
}
