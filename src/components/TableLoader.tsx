import * as React from 'react';
import _ from 'lodash';

export interface ITableLoaderProps {
  tableRows?: number;
}

export default function TableLoader({ tableRows = 10 }: ITableLoaderProps) {
  const TableRowLoader = () => (
    <div className='grid grid-rows-1 grid-flow-col gap-4 py-2'>
      <div className='bg-slate-700 rounded animate-pulse h-5' />
      <div className='bg-slate-700 rounded animate-pulse h-5' />
      <div className='bg-slate-700 rounded animate-pulse h-5' />
      <div className='bg-slate-700 rounded animate-pulse h-5' />
    </div>
  );

  return (
    <div>
      <div className='grid grid-rows-1 grid-flow-col gap-4'>
        <div className='bg-slate-700 rounded animate-pulse h-7' />
        <div className='bg-slate-700 rounded animate-pulse h-7' />
        <div className='bg-slate-700 rounded animate-pulse h-7' />
        <div className='bg-slate-700 rounded animate-pulse h-7' />
      </div>

      <div className='h-[1px] my-5 bg-gray-300' />

      {_.times(tableRows, (i) => (
        <TableRowLoader key={i} />
      ))}
    </div>
  );
}
