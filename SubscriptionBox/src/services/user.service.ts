import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

// Import the AF2 Module
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
    authState: Observable<firebase.User>;
    currentUser: firebase.User;

    constructor(private http: Http, public afAuth: AngularFireAuth) { 
        this.authState = afAuth.authState;
        this.currentUser = firebase.auth().currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updatePassword(newPassword: string) {
        this.currentUser.updatePassword(newPassword).then(function() {
            // Update successful.

            }, function(error) {
            // An error happened.
        });
    }

    resetPassword(){
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(this.currentUser.email).then(function() {
            // Email sent.
            return true;
        }, function(error) {
            // An error happened.
            return error;
        });
    }

    createUser(user: User){
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    }

    createUserWithFacebook(){
        // TODO: enable facebook authentication
    }

    // Update user information
    updateUser(user: User) {
        this.currentUser.updateProfile({
            displayName: user.username,
            photoURL: user.photo
        }).then(function() {
            // Update successful.
            return true;
        }, function(error) {
            // An error happened.
            return error;
        });

        this.currentUser.updateEmail(user.email).then(function() {
            // Update successful.
        }, function(error) {
            // An error happened.
        });
    }

    // Delete current user
    deleteUser() {
        this.currentUser.delete().then(function() {
            // User deleted.
        }, function(error) {
            // An error happened.
        });
    }
}