import {User} from './User';
import {RResponse} from './RResponse';

export class SuccessfulResponse extends RResponse {
  data: User;
}
