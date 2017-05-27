import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';

import { UserService } from '../../services/index';
import { User } from '../../models/user';

@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html'
})

export class RegistrationPage {
    createSuccess = false;
    
    constructor(
        private userService: UserService,
        private registerCredentials: User,
        private nav: NavController, 
        private alertCtrl: AlertController
        ) { 
            console.log("made it");
        }
    
    register() {
        this.userService.createUser(this.registerCredentials).then(function(success) {
            if (success) {
                this.createSuccess = true;
                this.showPopup("Success", "Account created.");
            } else {
                this.showPopup("Error", "Problem creating account.");
            }
        }, function(error) {
            this.showPopup("Error", error);
        });
    }

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
            {
            text: 'OK',
            handler: data => {
                if (this.createSuccess) {
                this.nav.popToRoot();
                }
            }
            }
        ]
        });
        alert.present();
    }
}