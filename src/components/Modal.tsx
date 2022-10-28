import * as React from 'react';

export interface IModalProps {
  rounded?: 'rounded-sm' | 'rounded-md' | 'rounded-lg';
  bg?: string;
  opacity?: string;
  p?: string;
  w: string;
  children: any;
}

export default function Modal({
  w,
  rounded = 'rounded-sm',
  bg = 'bg-neutral-900',
  opacity = 'opacity-90',
  p = 'p-5',
  children,
}: IModalProps) {
  return (
    <div
      className={`${w} absolute z-20 p-5 m-auto right-0 left-0 ${rounded} ${bg} ${opacity} ${p} opacity-0 animate-fadeIn animation-delay-100 animation-duration-200 animation-fill-forwards`}
    >
      <div className='w-full break-words'>{children}</div>
    </div>
  );
}
