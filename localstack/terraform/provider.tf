terraform {
  backend "local" {}
}

provider "aws" {
  region = "ap-northeast-1"

  access_key = "dummy"
  secret_key = "dummy"

  # localstack用の設定
  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true


  endpoints {
    dynamodb = "http://localhost:4566"
  }
}
