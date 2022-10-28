import * as React from 'react';
import { trpc } from '@/utils/trpc';
import Layout from '@/layouts/index';
import TableLoader from '@/components/TableLoader';

export default function ListProducts() {
  const { data, isLoading } = trpc.useQuery(['product.list', {}]);

  return (
    <Layout>
      <h1 className='text-3xl md:text-4xl font-comfortaa font-bold'>List Products</h1>

      <br />
      <br />
      <br />

      <div className='bg-slate-200 shadow-lg px-5 py-10 rounded-md'>
        {isLoading ? (
          <TableLoader />
        ) : (
          <table className='w-full table-fixed'>
            <thead>
              <tr className='border-gray-500 border-b font-raleway text-xl text-left'>
                <th className='pb-3'>Product ID</th>
                <th className='pb-3'>Product Name</th>
                <th className='pb-3'>Product Price</th>
                <th className='pb-3'>Category</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map(({ id, productName, productPrice, productCategory }) => (
                    <tr key={id} className='font-comfortaa h-14'>
                      <td>{id}</td>
                      <td>{productName}</td>
                      <td>{productPrice}</td>
                      <td>{productCategory}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
