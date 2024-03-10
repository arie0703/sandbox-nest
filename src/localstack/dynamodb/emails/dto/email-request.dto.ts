import { IsDefined, IsString, Length } from 'class-validator';

export class EmailRequest {
  @IsDefined()
  @Length(1, 80, { message: '$constraint2字以内で入力してください' })
  @IsString()
  readonly email: string;
}
