import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTripComponent } from 'src/app/shared/components/add-update-trip/add-update-trip.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilsService);

  ngOnInit() {
  }

  /* Cerrar sesión */
  signOut() {
    this.firebaseService.signOut();
  }

  /* Agregar o actualizar viaje */
  addUpdateTrip() {

    this.utilService.presentModal({
      component: AddUpdateTripComponent,
      cssClass: 'add-update-modal',
    })
  }

}
