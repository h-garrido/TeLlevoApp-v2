import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-add-update-trip',
  templateUrl: './add-update-trip.component.html',
  styleUrls: ['./add-update-trip.component.scss'],
})
export class AddUpdateTripComponent  implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    from_address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    to_address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl('', [Validators.required, Validators.min(0)])

  });

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user =this.utilsService.getFromLocalStorage('user');
  }

  async takeImage() {
    const dataUrl = (await this.utilsService.takePicture('Imagen tomada')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  async submit() {
    if (this.form.valid) {

      let path = `users/${this.user.uid}/trips`

      const loading = await this.utilsService.loading();
      loading.present();

      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id

      this.firebaseService
        .addDocument(path, this.form.value)
        .then(async res => {

          this.utilsService.dismissModal({ success: true});
          
          this.utilsService.presentToast({
            message: 'Viaje creado exitosamente',
            duration: 2000,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
            mode: 'ios',
          });
          



        })
        .catch((err) => {
          console.log(err);

          this.utilsService.presentToast({
            message: err.message,
            duration: 3000,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
            mode: 'ios',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
  }

  async watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      console.log(position, err);
    });
  }
}
