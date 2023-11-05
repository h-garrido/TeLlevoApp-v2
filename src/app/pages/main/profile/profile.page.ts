import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilsService);

  ngOnInit() {
  }

  user(): User {
    return this.utilService.getFromLocalStorage('user');
  }

  async takeImage() {

    let user = this.user();

    const dataUrl = (await this.utilService.takePicture('Imagen de Perfil')).dataUrl;
  }
}
