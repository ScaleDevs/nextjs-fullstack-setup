import { z } from 'zod';
import { createRouter } from '../createRouter';
import { authMiddleware } from '../util';
import { ProductService } from '@/svc/product.service';

export const productRouter = createRouter()
  .middleware(authMiddleware)
  .query('list', {
    input: z.object({
      category: z.string().optional(),
    }),
    resolve({ input }) {
      return ProductService.listProducts(input.category);
    },
  })
  .mutation('create', {
    input: z.object({
      productName: z.string(),
      productPrice: z.number(),
      productCategory: z.string(),
    }),
    resolve({ input }) {
      return ProductService.createProduct(input);
    },
  });
