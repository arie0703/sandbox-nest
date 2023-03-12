import { Controller, Param, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: HttpStatus.CREATED })
  @Post(':productName')
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Param('productName') productName: string): Promise<object> {
    return this.productsService.createProduct(productName);
  }
}
