import { useEffect, useState } from 'react';
import ResizableComponent from '../ResizableComponent/ResizableComponent';
import classNames from 'classnames';

interface TagProps {
  id: string;
  label: string;
  onDelete?: (id: string) => void;
}

const Tag = ({ id, label, onDelete }: TagProps) => {
  const [text, setText] = useState(label);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    deleteMode ? setText('Delete?') : setText(label);
  }, [deleteMode]);

  return (
    <div
      className={classNames(
        'inline-flex items-center space-x-2 text-defaultText transition px-3 py-2 rounded-full text-sm whitespace-nowrap align-middle w-fit select-none',
        {
          'bg-greyBg hover:bg-[#BDCCDB]': !deleteMode,
          'text-negativeRed bg-errorBg': deleteMode,
        },
      )}
    >
      <ResizableComponent>
        <span>{text}</span>
      </ResizableComponent>
      {deleteMode && (
        <svg
          className="hover:cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => onDelete && onDelete(id)}
        >
          <circle cx="10" cy="10" r="10" fill="#FFF5F7" />
          <path
            d="M6 10.2369L8.84211 13.079L15 6.92114"
            stroke="#F32448"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <svg
        className={classNames('hover:cursor-pointer stroke-[#454D54]', {
          'stroke-[#A3747C]': deleteMode,
        })}
        width="10"
        height="9"
        viewBox="0 0 10 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setDeleteMode(!deleteMode)}
      >
        <path d="M1 0.5L9 8.5" />
        <path d="M9 0.5L1 8.5" />
      </svg>
    </div>
  );
};

Tag.componentProps = {
  label: String,
};

export default Tag;
