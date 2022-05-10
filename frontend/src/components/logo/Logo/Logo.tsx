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
      <Logomark className="h-[35.25px] w-[55.12500px] md:h-[47px] md:w-[73.5px]" />
      <Logotype className="h-[25.5px] w-[145.125px] md:h-[34px] md:w-[193.5px]" />
    </div>
  );
};

export default Logo;
