import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

  newPassword="";
  constructor(  private toastController: ToastController,
    private router: Router,private auth: AngularFireAuth) { }

  ngOnInit() {
  }

async updatePassword(){

 await this.auth.currentUser.then( user => {
    if (user) {
      user.updatePassword(this.newPassword)
        .then(() => {
          // Password update successful
          this.presentToast('Password updated successfully');
          this.router.navigate(['/home']);
          // Add any additional code you want to execute after updating the password
        })
        .catch(error  => {
          // An error occurred while updating the password
          console.error('Error updating password:', error);
          // Handle the error and display an error message to the user
        });
    } else {
      // User is not currently signed in
      console.error('No user signed in');
      // Handle the case where the user is not signed in
    }
  });

}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'top',
    color: 'royalblue',
    cssClass: 'toast-message',
  });
  toast.present();
}


}