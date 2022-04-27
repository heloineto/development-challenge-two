import classNames from 'clsx';
import { createElement } from 'react';

interface Props extends ComponentProps<'div'> {
  as?: string;
}

const Grid = ({ className, as = 'div', ...divProps }: Props) => {
  return createElement(as, {
    className: classNames(className, 'grid grid-cols-12 gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5'),
    ...divProps,
  });
};

export default Grid;
