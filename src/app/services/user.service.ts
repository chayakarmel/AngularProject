import { Injectable } from '@angular/core';
import User from '../../models/User';




@Injectable({
  providedIn: 'root'
})
export class UserService {
   users: User[] = [
    {
      id: 1,
      name: "chaya",
      address: "Rabi Akiva 118",
      email: "chayaka@bdo.co.il",
      password: "123456"
    },
    {
      id: 2,
      name: "pery",
      address: "Bnei Brak",
      email: "pe0533183564@gmail.com",
      password: "456456"
    },
    {
      id: 3,
      name: "leha",
      address: "Ashdod",
      email: "l0533105649@gmailcom",
      password: "78910"
    },
   
    {
      id: 4,
      name: "deby",
      address: "Bal Shem Tov 9",
      email: "chayakarmel207@gmeil.com",
      password: "741963"
    },
  
  ]
  
  
  


  getUser(){
     return this.users;
  }

  constructor() { }
}
