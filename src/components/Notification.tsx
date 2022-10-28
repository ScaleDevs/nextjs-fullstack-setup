import * as React from 'react';
import FadeIn from './FadeIn';
import IconComp from './Icon';

export interface INotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  rounded?: 'sm' | 'md' | 'lg';
  p?: string;
}

export default function Notification({ message, rounded = 'sm', type = 'info', p = 'p-4' }: INotificationProps) {
  const borderRadius = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  };

  const bgColor = {
    success: 'bg-green-700',
    error: 'bg-red-400',
    info: 'bg-blue-500',
  };

  const RenderIcon = {
    success: () => <IconComp iconName='CheckCircleIcon' iconProps={{ fillColor: 'fill-green-500' }} />,
    error: () => <IconComp iconName='ErrorIcon' iconProps={{ fillColor: 'fill-red-500' }} />,
    info: () => <IconComp iconName='InfoIcon' iconProps={{ fillColor: 'fill-blue-400' }} />,
  };

  const GetIcon = () => {
    const ShowIcon = RenderIcon[type];
    return <ShowIcon />;
  };

  return (
    <FadeIn>
      <div className={`${borderRadius[rounded]} ${bgColor[type]} ${p}`}>
        <div className='w-full flex flex-row space-x-3 items-center'>
          <GetIcon />
          <h1 className='font-raleway font-bold text-sm'>{message}</h1>
        </div>
      </div>
    </FadeIn>
  );
}
