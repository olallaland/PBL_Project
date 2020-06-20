
export class UserInfo {
  // tslint:disable-next-line:variable-name
  user_type: string;
  // tslint:disable-next-line:variable-name
  user_id: string;
  // tslint:disable-next-line:variable-name
  user_name: string;
  gender: string;
  password: string;
  picture: string;

  // tslint:disable-next-line:variable-name
  constructor(user_type: string, user_id: string, user_name: string, password: string, picture: string) {
    this.user_type = user_type;
    this.user_id = user_id;
    this.user_name = user_name;
    this.password = password;
    this.picture = picture;
  }
}
