import { IProduct } from '@/utils/types';
import { ProductRepository } from '@/server/repository/product.repo';
import { TRPCError } from '@trpc/server';

class Service {
  public async createProduct(productData: Omit<IProduct, 'id'>) {
    try {
      return ProductRepository.createProduct(productData);
    } catch (err) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
    }
  }

  public async listProducts(category?: string) {
    try {
      return ProductRepository.listProducts(category);
    } catch (err) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
    }
  }
}

export const ProductService = new Service();
