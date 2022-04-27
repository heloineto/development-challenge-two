import classNames from 'clsx';
import { createElement } from 'react';

interface Props extends ComponentProps<'div'> {
  as?: string;
}

const Grid = ({ className, as = 'div', ...divProps }: Props) => {
  return createElement(as, {
    className: classNames(className, 'grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 lg:gap-5'),
    ...divProps,
  });
};

export default Grid;
