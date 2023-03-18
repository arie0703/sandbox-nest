import { IsNotEmpty, IsDefined, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// 環境変数のバリデーション
export class EnvValidator {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  AWS_DYNAMODB_REGION: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  AWS_DYNAMODB_ENDPOINT: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  AWS_ACCESS_KEY_ID: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  AWS_SECRET_ACCESS_KEY: string;
}

/**
 * ②
 * @param config バリデーション対象の Record<string, any>。今回は .env.development.local と 環境変数が合体したもの
 * @returns バリデーション済の Record<string, any>
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
