import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { OrderPage } from '../pages/order/order';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { AuthenticationService, UserService } from '../services/index';
import { AuthGuard } from '../guards/auth.guard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Payment, User } from '../models/index';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyCD_O6JMn9YV4fUShPkno0Z2wXnFebyv4U",
    authDomain: "subscriptionbox-8c553.firebaseapp.com",
    databaseURL: "https://subscriptionbox-8c553.firebaseio.com",
    projectId: "subscriptionbox-8c553",
    storageBucket: "subscriptionbox-8c553.appspot.com",
    messagingSenderId: "1057545099471"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(LoginPage),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  declarations: [
    MyApp,
    OrderPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrationPage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderPage,  
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrationPage
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    User, Payment,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {

}
