import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resert-password',
  templateUrl: './resert-password.page.html',
  styleUrls: ['./resert-password.page.scss'],
})
export class ResertPasswordPage implements OnInit {

  email="";
  constructor(private toastController: ToastController,private router:Router, private auth:AngularFireAuth) { }

  ngOnInit() {
  }

  resetPassword(){
   
   
    this.auth.sendPasswordResetEmail(this.email)
    .then(userCredential => {
  
      this.presentToast("Email sent with link to reset your password","primary");
      this.router.navigateByUrl("/login");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.presentToast(errorMessage,"red");
      // ..
    });
  }

  async presentToast(message: string, color:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color:  color,
    });
    toast.present();
  }
  
}
