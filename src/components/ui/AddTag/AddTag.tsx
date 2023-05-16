import { useEffect, useState } from 'react';
import ResizableComponent from '../ResizableComponent/ResizableComponent';
import classNames from 'classnames';
import { Tag } from '../../../api/types/ApiResponses';

interface TagProps {
  id: string;
  label: string;
  tags: Tag[];
  onDelete?: (id: string) => void;
}

const Tag = ({ id, label, tags, onDelete, ...props }: TagProps) => {
  const [editMode, setEditMode] = useState(false);
  const [saveMode, setSaveMode] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length > 0 ? setSaveMode(true) : setSaveMode(false);
  };

  useEffect(() => {
    setSaveMode(false);
  }, [editMode]);

  return (
    <div
      className={classNames(
        'inline-flex items-center space-x-1 text-defaultText transition px-3 py-2 rounded-full border-borderGrey border-[1px] text-sm whitespace-nowrap align-middle w-fit select-none',
        {
          'border-borderGrey border-solid': editMode,
          'border-dashed hover:border-solid hover:border-controlGreyHover': !editMode,
        },
      )}
    >
      <div onClick={() => setEditMode(true)}>
        <ResizableComponent>{!editMode && <span>{label}</span>}</ResizableComponent>

        {editMode && (
          <input
            autoFocus
            type="text"
            onChange={handleOnChange}
            className="border-none w-12 inline-block font-normal text-sm/6 text-defaultText"
            {...props}
          />
        )}
      </div>
      {saveMode && (
        <svg
          className="cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="10" fill="#CFFCED" />
          <path
            d="M6 10.2369L8.84211 13.079L15 6.92114"
            stroke="#29A37A"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      {editMode && (
        <svg
          className="cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setEditMode(false)}
        >
          <circle cx="10" cy="10" r="10" fill="#F6F9F9" />
          <path d="M6 6L14 14" stroke="#ABB3BA" stroke-linecap="round" />
          <path d="M14 6L6 14" stroke="#ABB3BA" stroke-linecap="round" />
        </svg>
      )}
    </div>
  );
};

export default Tag;
