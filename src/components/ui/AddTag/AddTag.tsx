import { useEffect, useState } from 'react';
import ResizableComponent from '../ResizableComponent/ResizableComponent';
import classNames from 'classnames';

interface TagProps {
  id: string;
  label: string;
  onDelete?: (id: string) => void;
}

const Tag = ({ id, label, onDelete, ...props }: TagProps) => {
  const [text, setText] = useState(label);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // editMode ? setText('Delete?') : setText(label);
    console.log('editMode', editMode);
  }, [editMode]);

  return (
    <div
      className="inline-flex items-center space-x-2 text-defaultText transition px-3 py-2 rounded-full border-borderGrey border-[1px] border-dashed text-sm whitespace-nowrap align-middle w-fit select-none"
      onClick={() => setEditMode(true)}
    >
      <ResizableComponent>{!editMode && <span>{text}</span>}</ResizableComponent>
      {editMode && (
        <input
          type="text"
          // onChange={onChange}
          className="pl-3 border-none h-fit w-fit inline-block font-normal text-sm/6 text-defaultText"
          {...props}
        />
      )}
      {editMode && (
        <svg
          className={classNames('hover:cursor-pointer stroke-[#454D54]')}
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setEditMode(false)}
        >
          <path d="M1 0.5L9 8.5" />
          <path d="M9 0.5L1 8.5" />
        </svg>
      )}
    </div>
  );
};

Tag.componentProps = {
  label: String,
};

export default Tag;
