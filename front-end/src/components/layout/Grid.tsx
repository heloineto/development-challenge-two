import classNames from 'clsx';
import { createElement } from 'react';

interface Props extends ComponentProps<'div'> {
  as?: string;
}

const Grid = ({ className, as = 'div', ...divProps }: Props) => {
  return createElement(as, {
    className: classNames(
      className,
      'grid grid-cols-12 gap-x-2 gap-y-5 sm:gap-x-3 sm:gap-y-6 md:gap-x-4 md:gap-y-10 lg:gap-x-5 lg:gap-y-16',
    ),
    ...divProps,
  });
};

export default Grid;
