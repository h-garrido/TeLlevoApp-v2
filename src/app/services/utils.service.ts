import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  /* LOADING */

  loading() {
    return this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent',
      showBackdrop: true,
      cssClass: 'loading',
    });
  }

  /* TOAST */

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  /* ROUTER (Cualquier página disponible) */

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  /* Guarda un elemento */

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  /* Obtiene un elemento */

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
