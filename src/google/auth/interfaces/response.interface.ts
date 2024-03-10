export interface Response {
  status: number;
  message: string;
  user: {
    id: string;
    email: string;
  }
}