import * as React from 'react';

export default function FadeIn({ children }: any) {
  return (
    <div className='opacity-0 animate-fadeIn animation-delay-100 animation-duration-500 animation-fill-forwards duration-100'>
      {children}
    </div>
  );
}
