import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  Promise.all([
    prisma.customer.create({
      data: {
        name: 'Sample Customer',
        email: 'customer@example.com',
        address: 'Tokyo'
      }
    }),
    prisma.product.create({
      data: {
        name: 'チョコレート',
        price: 100,
        stock: 50,
      }
    }),
    prisma.product.create({
      data: {
        name: '牛乳',
        price: 150,
        stock: 20,
      }
    })
  ])
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })