import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Import the AF2 Module
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
    user: Observable<firebase.User>;
    currentUser: firebase.User;

    constructor(public afAuth: AngularFireAuth) {
        this.user = afAuth.authState;
        this.currentUser = firebase.auth().currentUser;
    }

    loginWithGmail(username: string, password: string) {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error){
            var errorName = error.name;
            var errorMessage = error.message;
            console.log(errorName + " " + errorMessage);
        });
    }

    loginWithUsername(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }
    
    loginWithEmail(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        // remove user from local storage to log user out
        this.afAuth.auth.signOut();
    }

    reauthenticateUser(){
        var credential;

        // Prompt the user to re-provide their sign-in credentials
        this.currentUser.reauthenticate(credential).then(function() {
        // User re-authenticated.
        }, function(error) {
        // An error happened.
        });
    }

    verifyEmail(){
        this.currentUser.sendEmailVerification().then(function() {
        // Email sent.
        }, function(error) {
        // An error happened.
        });
    }
}