import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
  put(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  remove(key) {
    sessionStorage.removeItem(key);
  }
  clear() {
    sessionStorage.clear();
  }
}
