import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahPageRoutingModule } from './tambah-routing.module';

import { TambahPage } from './tambah.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahPageRoutingModule,
    HttpClientModule
  ],
  declarations: [TambahPage]
})
export class TambahPageModule {}
