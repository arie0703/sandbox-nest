import { Test, TestingModule } from '@nestjs/testing';
import { MartService } from './mart.service';

describe('MartService', () => {
  let service: MartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MartService],
    }).compile();

    service = module.get<MartService>(MartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add product to cart', async () => {
    const request = {
      productId: 1,
      customerId: 1,
    }
    const response = await service.addProductToCart(request);
    expect(response.status).toBe(201);
    expect(response.message).toBe("カートに商品を追加しました");
  });
});
