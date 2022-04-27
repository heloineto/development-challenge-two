import React from 'react';

type Props = ComponentProps<'div'>;

const Logo = ({ ...divProps }: Props) => {
  return <div {...divProps}>Logo</div>;
};

export default Logo;
