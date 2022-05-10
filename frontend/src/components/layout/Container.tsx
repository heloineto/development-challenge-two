import classNames from 'clsx';
import { createElement } from 'react';

interface Props extends ComponentProps<'div'> {
  as?: string;
}

const Container = ({ className, as = 'div', ...divProps }: Props) => {
  return createElement(as, {
    className: classNames(
      className,
      'max-w-[96rem] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:mx-auto 2xl:px-10',
    ),
    ...divProps,
  });
};

export default Container;
