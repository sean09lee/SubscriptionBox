import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthenticationService } from '../../services/index';
import { User } from '../../models/user';
import { RegistrationPage } from '../registration/registration';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
    loading: any = Loading;
    pushPage: any;

    constructor(
        private nav: NavController,
        private authenticationService: AuthenticationService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private registerCredentials: User) { 
            this.pushPage = RegistrationPage;
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.loading = Loading;
    }

    public createAccount() {
        this.nav.push('RegistrationPage');
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }
    
    showError(text) {
        this.loading.dismiss();
    
        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
    
    login() {
        this.showLoading();
        this.authenticationService.loginWithEmail(this.registerCredentials.email, this.registerCredentials.password).then(function() {
            this.nav.setRoot('HomePage');
        }, function(error) {
            this.showError(error);
        });
    }
}
