import { IsNotEmpty, IsDefined, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// 環境変数のバリデーション
export class EnvValidator {
  ENV: string;

  AWS_LOCALSTACK_REGION: string;

  AWS_LOCALSTACK_ENDPOINT: string;

  AWS_ACCESS_KEY_ID: string;

  AWS_SECRET_ACCESS_KEY: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  SQS_QUEUE_URL: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  SLACK_WORKFLOW_URL: string;
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
