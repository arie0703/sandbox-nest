import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { Response } from "./interfaces/response.interface";

@Injectable()
export class AuthService {
  async login(user: User | undefined): Promise<Response> {
    if (user === undefined) {
      throw new InternalServerErrorException(
        {
          status: 400,
          message: 'ユーザー情報が正常に渡されませんでした。',
          user: user
        }
      );
    }

    const response: Response = {
      status: 200,
      message: '認証に成功しました',
      user: {
        id: user.id,
        email: user.email
      }
    };

    console.log(response);
    return response;
  }
}