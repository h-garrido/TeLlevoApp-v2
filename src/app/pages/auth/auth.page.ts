import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

firebaseService = inject(FirebaseService);
utilsService = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsService.loading();
      loading.present();
      this.firebaseService.signIn(this.form.value as User).then(res => {

        this.getUserInfo(res.user.uid);

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

  async getUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsService.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firebaseService
        .getDocument(path)
        .then((user: User) => {

          this.utilsService.saveInLocalStorage('user', user);
          this.utilsService.routerLink('/main/home');
          this.form.reset();

          this.utilsService.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 2000,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline',
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

}
