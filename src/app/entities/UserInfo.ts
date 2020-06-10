
export class UserInfo {
  code: number;
  message: string;
  type: string;
  userID: string;
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
  constructor(code: number, message: string, type: string, userID: string, password: string, name: string, gender: string, picture: string) {
    this.code = code;
    this.message = message;
    this.type = type;
    this.userID = userID;
    this.password = password;
    this.name = name;
    this.gender = gender;
    this.picture = picture;
  }

// public constructor(name: string) {
  //   this.userName = name;
  // }
}
