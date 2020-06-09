
export class UserInfo {
  code: number;
  message: string;
  id: number;
  type: string;
  username: string;
  password: string;
  name: string;
  gender: string;
  picture: string;
  // public constructor(
  //   fields?: {
  //     id: number,
  //     userName: string,
  //     password: string
  //   }) {
  //   // tslint:disable-next-line:curly
  //   if (fields) Object.assign(this, fields);
  // }

  // tslint:disable-next-line:max-line-length
  constructor(code: number, message: string, id: number, type: string, username: string, password: string, name: string, gender: string, picture: string) {
    this.code = code;
    this.message = message;
    this.id = id;
    this.type = type;
    this.username = username;
    this.password = password;
    this.name = name;
    this.gender = gender;
    this.picture = picture;
  }

// public constructor(name: string) {
  //   this.userName = name;
  // }


  getFullName(): string {
    return this.id + ' ' + this.username;
  }
}
