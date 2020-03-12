export interface IAuth {
  _id: string;
  issuedOn: number;
  expiredOn: number;
  username: string;
  firstName: string;
  lastName: string;
  name: string;
  token?: string;
}
