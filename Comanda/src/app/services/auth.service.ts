import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth, private firestore: Firestore, private router: Router) { }

  async login(user: User) {
    return await this.afauth.signInWithEmailAndPassword(user.email, user.password);
  }

  async register(user: User) {
    return await this.afauth.createUserWithEmailAndPassword(user.email, user.password);
  }

  getUserLogged() {

    return this.afauth.authState;
  }

  getUser() {
    return this.afauth.currentUser
  }

  logout() {
    this.afauth.signOut().then(() => this.router.navigate(['log']));
  }

  async logoutAnonimo() {
    await this.afauth.signOut();
  }

}
