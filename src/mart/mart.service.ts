import { Injectable } from '@nestjs/common';
import { CartItem, PrismaClient } from '@prisma/client';
import { CustomerRequest } from './dto/customer-request.dto';

const prisma = new PrismaClient()
@Injectable()
export class MartService {

  async addProductToCart(request: CustomerRequest): Promise<object> {

    await prisma.cartItem.create(
      {
        data: {
          productId: request.productId,
          customerId: request.customerId,
        }
      }
    )

    return {
      status: 201,
      message: "カートに商品を追加しました"
    }
  }

  async order(request: CustomerRequest): Promise<object> {

    const cartItems = await prisma.cartItem.findMany({
      where: {
        customerId: request.customerId
      }
    })

    // 注文データを作成する
    const order = await prisma.order.create({
      data: {
        customerId: request.customerId,
        isProcessed: false,
        billingAmount: 0,
      }
    })

    var billingAmount = 0;

    // カートに入っている商品を一つずつ注文詳細データとして登録する。

    try {
      await Promise.all([
        cartItems.map(async (item: CartItem) => {
          const price = (await prisma.product.findFirst({ where: { id: item.productId } })).price;
          prisma.orderDetail.create({
            data: {
              orderId: order.id,
              price: price,
              productId: item.productId
            }
          })
          billingAmount += price;
          console.log(billingAmount);
        }),


        // ユーザーのカートを空にする
        prisma.cartItem.deleteMany({
          where: {
            customerId: request.customerId
          }
        })
      ]);
    } finally {
      // 注文の代金を確定させる
      await prisma.order.update({
        where: {
          id: order.id
        },
        data: {
          billingAmount: billingAmount
        }
      })

      console.log({
        message: "最終的な注文",
        billingAmount: billingAmount
      })
    }

    return {
      status: 200,
      message: "商品を注文しました"
    }
  }
}
