import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { TestPage } from './test/test.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private modalController: ModalController,
    private menuController: MenuController
  ) {}

  public async onOpenModal() {
    const modal = await this.modalController.create({
      component: TestPage,
      //swipeToClose: true,
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
