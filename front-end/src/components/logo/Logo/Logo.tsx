import React from 'react';
import Logomark from '../Logomark';
import Logotype from '../Logotype';
import classNames from 'clsx';

type Props = ComponentProps<'div'>;

const Logo = ({ className, ...divProps }: Props) => {
  return (
    <div
      className={classNames(className, 'flex items-center justify-center gap-2.5')}
      {...divProps}
    >
      <Logomark />
      <Logotype />
    </div>
  );
};

export default Logo;
