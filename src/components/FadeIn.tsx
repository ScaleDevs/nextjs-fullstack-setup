import * as React from 'react';

interface IFadeInProps {
  children: any;
  cssText?: string;
}

export default function FadeIn({ children, cssText }: IFadeInProps) {
  return (
    <div
      className={`opacity-0 animate-fadeIn animation-delay-100 animation-duration-500 animation-fill-forwards duration-100 ${
        cssText ? cssText : ''
      }`}
    >
      {children}
    </div>
  );
}
