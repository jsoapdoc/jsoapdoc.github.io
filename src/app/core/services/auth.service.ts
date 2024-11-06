import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.authStateSubject.next(user);
    });
  }

  private auth = inject(Auth);

  private authStateSubject = new BehaviorSubject<any>(null);

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }

  getAuthState(): Observable<any> {
    return this.authStateSubject.asObservable();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStateSubject.asObservable().pipe(map((user) => !!user));
  }
}
