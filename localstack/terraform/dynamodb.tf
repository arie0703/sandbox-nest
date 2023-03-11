resource "aws_dynamodb_table" "products_table" {
  name           = "Products"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "ProductName"

  attribute {
    name = "ProductName"
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }

  tags = {
    Name        = "products-table"
    Environment = "local"
  }
}
