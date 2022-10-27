import prisma from './prisma.client';
import { IProduct } from '@/utils/types';

class Respository {
  public async createProduct(productData: Omit<IProduct, 'id'>) {
    const product = await prisma.product.create({ data: { ...productData } });
    return product;
  }

  public async listProducts(category?: string) {
    const products = await prisma.product.findMany({ where: { productCategory: category } });
    return products;
  }
}

export const ProductRepository = new Respository();
