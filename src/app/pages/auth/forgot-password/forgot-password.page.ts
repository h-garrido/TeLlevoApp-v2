import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

firebaseService = inject(FirebaseService);
utilsService = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsService.loading();
      loading.present();
      this.firebaseService.sendRecoveryEmail(this.form.value.email).then(res => {

        this.utilsService.presentToast({
          message: 'Correo enviado correctamente',
          duration: 2000,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline',
          mode: 'ios'
        })

        this.utilsService.routerLink('/auth');
        this.form.reset();

      }).catch(err => {
        console.log(err);

        this.utilsService.presentToast({
          message: err.message,
          duration: 3000,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
          mode: 'ios'
        })
        
      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  
}
