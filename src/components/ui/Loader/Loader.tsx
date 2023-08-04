import React from 'react';
import './Loader.css';

export interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 79 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 29.381V48.8095C5 53.2278 8.58172 56.8095 13 56.8095V56.8095C17.4183 56.8095 21 53.2278 21 48.8095V13C21 8.58171 24.5817 5 29 5V5C33.4183 5 37 8.58172 37 13V61C37 65.4183 40.5817 69 45 69V69C49.4183 69 53 65.4183 53 61V25.1905C53 20.7722 56.5817 17.1905 61 17.1905V17.1905C65.4183 17.1905 69 20.7722 69 25.1905V44.619"
        stroke="#E0EBEB"
        className="svg-elem-1"
      ></path>
    </svg>
  );
};
