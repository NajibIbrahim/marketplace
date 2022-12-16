import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

export interface GetParams<T> {
  params: T;
}
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navigationExtras: NavigationExtras = {};

  constructor(
    private navCtrl: NavController,
    private router: Router,
  ) {}

  navigateForward(route: string, params?: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: params,
      },
    };
    this.navCtrl.navigateForward([route], navigationExtras).catch(error => {
      console.log(error);
    });
  }

  navigateForwardV2(route: string, params?: any) {
    const navigationExtras: NavigationExtras = {
      state: params,
    };
    this.navCtrl.navigateForward([route], navigationExtras).catch(error => {
      if(error) {
        this.navCtrl.navigateForward(['benefits/' + route], navigationExtras)
      }
    });
  }

  navigateWithReplace(route: string, state?: any) {
    this.navigationExtras.replaceUrl = true;
    this.navigationExtras.state = state;
    this.router.navigateByUrl(route, this.navigationExtras).catch(error => {
      if(error) {
        this.router.navigateByUrl('benefits/' + route, this.navigationExtras)
      }
    });
  }

  navigateRoot(page: string, params?: any) {
    const navigationExtras: NavigationExtras = {
      state: params,
    };
    this.navCtrl.navigateRoot([page], navigationExtras).catch(error => {
      if(error) {
        this.navCtrl.navigateRoot(['benefits/' + page], navigationExtras)
      }
    });
  }

  inappServiceRootPage() {
    const rootPage: number = window.history.length - 1;
    window.history.go(-rootPage);
  }

  navigateBack(page: string, params?: any) {
    const navigationExtras: NavigationExtras = {
      state: params,
    };
    this.navCtrl.navigateBack([page], navigationExtras).catch(error => {
      if(error) {
        this.navCtrl.navigateBack(['benefits/' + page], navigationExtras)
      }
    });
  }

  getParamsV2() {
    const state: any = this.router.getCurrentNavigation()?.extras?.state;
    if (state) {
      return state;
    } else {
      return undefined;
    }
  }

  getParams() {
    return this.router.getCurrentNavigation()?.extras?.state;
  }

  async setRoot(page: string, params?: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        params
      }
    };

    return this.navCtrl.navigateRoot([page], navigationExtras);
  }
}
