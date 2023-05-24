import { cva } from 'class-variance-authority';
import { LocalContact } from '../../../types/LocalTypes';
import classNames from 'classnames';

const nameVariants = cva('', {
  variants: {
    size: {
      small: ['text-13px'],
      large: ['text-[1.25rem]', 'font-semibold'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const emailVariants = cva('text-greyText', {
  variants: {
    size: {
      small: ['text-xs'],
      large: ['text-sm'],
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

interface ContactProps extends LocalContact {
  size: 'small' | 'large';
}

const Contact = ({ name, email, size }: ContactProps) => {
  return (
    <div className="flex flex-col">
      <span className={nameVariants({ size: size })}>{name}</span>
      <span className={emailVariants({ size: size })}>{email}</span>
    </div>
  );
};

export default Contact;
