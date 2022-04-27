import classNames from 'clsx';
import { createElement } from 'react';

interface Props extends ComponentProps<'div'> {
  as?: string;
}

const Grid = ({ className, as = 'div', ...divProps }: Props) => {
  return createElement(as, {
    className: classNames(
      className,
      'grid grid-cols-12 gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6 md:gap-x-6 md:gap-y-10 lg:gap-x-10 lg:gap-y-16',
    ),
    ...divProps,
  });
};

export default Grid;
