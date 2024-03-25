import { ApiProperty } from "@nestjs/swagger";

export class CustomerRequest {
  @ApiProperty({type: Number, description: 'Customer ID', example: 1})
  readonly customerId: number;
  @ApiProperty({type: Number, description: 'Product ID', example: 1})
  readonly productId: number;
}

export class CustomerResponse {
  @ApiProperty({type: Number, description: 'Status Code', example: 200})
  readonly status: number;
  @ApiProperty({type: String, description: 'Message', example: "Success"})
  readonly message: string;
  @ApiProperty({type: String, description: 'detail', example: "注文料金は1000円です"})
  readonly detail?: string;
}
