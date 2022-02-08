import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestPage } from './test.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [TestPage],
})
export class TestPageModule {}
