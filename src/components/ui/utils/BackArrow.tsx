import { ButtonHTMLAttributes } from 'react';

interface BackArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'back' | 'close';
}

const BackArrow: React.FC<BackArrowProps> = ({ intent = 'close', ...props }) => {
  return (
    <button className="inline-block lg:ml-[3.25rem] w-6 h-6" {...props}>
      {intent === 'back' ? (
        <svg
          className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] transition stroke-controlGrey hover:stroke-controlGreyHover"
          width="26"
          height="22"
          viewBox="0 0 26 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 21L1 11L11 1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 11.082H25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Close Button">
            <path id="Vector 11" d="M22 21L12 11L22 1" stroke="#ABB3BA" strokeLinecap="round" strokeLinejoin="round" />
            <path
              id="Vector 15"
              d="M2 0.999999L12 11L2 21"
              stroke="#ABB3BA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      )}
    </button>
  );
};

export default BackArrow;
