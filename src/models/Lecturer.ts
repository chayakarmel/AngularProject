export default class Lecturer {
    lecturerId: number;
    name: string;
    address: string;
    email: string;
    password: string;
  
    constructor(lecturerId: number, name: string, address: string, email: string, password: string) {
      this.lecturerId = lecturerId;
      this.name = name;
      this.address = address;
      this.email = email;
      this.password = password;
    }
  }