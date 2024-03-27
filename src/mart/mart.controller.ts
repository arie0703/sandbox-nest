import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MartService } from './mart.service';
import { CustomerRequest } from './dto/customer.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('mart')
export class MartController {
  constructor(private readonly martService: MartService) { }

  // [SAMPLE]
  // curl -XPOST localhost/mart/cartItem/create -H "Content-Type: application/json" -d '{"customerId": 1, "productId": 2}'
  @ApiResponse({ status: HttpStatus.OK })
  @Post('/cartItem/create')
  @HttpCode(HttpStatus.CREATED)
  addProductToCart(@Body() request: CustomerRequest): Promise<object> {
    return this.martService.addProductToCart(request);
  }

  // [SAMPLE]
  // curl -XPOST localhost/mart/order/create -H "Content-Type: application/json" -d '{"customerId": 1, "productId": 1}'
  @ApiResponse({ status: HttpStatus.OK })
  @Post('/order/create')
  @HttpCode(HttpStatus.CREATED)
  order(@Body() request: CustomerRequest): Promise<object> {
    return this.martService.order(request);
  }
}
