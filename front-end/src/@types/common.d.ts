type ReactNode = import('react').ReactNode;
type CSSProperties = import('react').CSSProperties;
type RefObject<A> = import('react').RefObject<A>;
type ComponentProps<A> = import('react').ComponentProps<A>;
type SetStateAction<A> = import('react').SetStateAction<A>;
type Dispatch<A> = import('react').Dispatch<A>;
type SetState<A> = Dispatch<SetStateAction<A>>;

type NextPage = import('next').NextPage;

type Icon = PhosphorIcon | (({ ...svgProps }: Props) => EmotionJSX.Element);

type TailwindColorName =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface IError {
  message?: string;
}
