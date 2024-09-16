import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private userEmitter: EventEmitter<User> = new EventEmitter();
  private user: User = new User();

  constructor() { }

  /**
   * Invia le informazioni dell'utente che ha appena eseguito l'accesso
   * @param u {string} Utente
   */
  public setUser(user: User): void {
    console.log(user);

    this.user = user;
    this.userEmitter.emit(user);

    localStorage.setItem('id', user.id.toString());
    localStorage.setItem('username', user.nome_utente);
    localStorage.setItem('email', user.email);
  }

  /**
   * Restituisce l'oggetto utente
   */
  public get getUser(): User {
    return this.user;
  }

  /**
   * Permette di stare in ascolto dell'utente che esegue l'accesso
   */
  public get userListener(): EventEmitter<User> {
    return this.userEmitter;
  }
}