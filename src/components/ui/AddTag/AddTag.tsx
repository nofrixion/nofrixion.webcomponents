import { useEffect, useState } from 'react';
import ResizableComponent from '../ResizableComponent/ResizableComponent';
import { Tag } from '../../../api/types/ApiResponses';
import Downshift from 'downshift';

interface TagProps {
  tags: Tag[];
  onTagAdded?: (tag: Tag) => void;
}

const AddTag = ({ tags, onTagAdded }: TagProps) => {
  const [editMode, setEditMode] = useState(false);
  const [saveMode, setSaveMode] = useState(false);
  const [tagname, setTagName] = useState('');

  const reset = () => {
    setEditMode(false);
    setSaveMode(false);
  };

  const saveTag = () => {
    var existingTag = tags.find((tag) => tag.name === tagname);

    if (existingTag) {
      onTagAdded && onTagAdded(existingTag);
    } else {
      onTagAdded && onTagAdded({ name: tagname });
    }
    reset();
  };

  const items = tags.map((tag) => ({ value: tag.name }));

  const stateReducer = (state: any, changes: any) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.mouseUp:
        return {
          ...changes,
          isOpen: true,
          inputValue: state.inputValue,
        };
      default:
        return changes;
    }
  };

  return (
    <>
      {!editMode && (
        <div className="inline-flex items-center space-x-1 text-defaultText transition px-3 py-2 rounded-full border-borderGrey border-[1px] border-dashed hover:border-solid hover:border-controlGreyHover text-sm whitespace-nowrap align-middle select-none">
          <div onClick={() => setEditMode(true)}>
            <span>Add tag</span>
          </div>
        </div>
      )}

      {editMode && (
        <div className="relative">
          <div className="justify-end inline-flex items-center space-x-1 text-defaultText transition px-3 py-2 rounded-full border-borderGrey border-[1px] border-solid h-10 text-sm whitespace-nowrap align-middle select-none">
            <div className="w-12"></div>
            {saveMode && (
              <div>
                <svg
                  className="cursor-pointer"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => saveTag()}
                >
                  <circle cx="10" cy="10" r="10" fill="#CFFCED" />
                  <path
                    d="M6 10.2369L8.84211 13.079L15 6.92114"
                    stroke="#29A37A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
            <div>
              <svg
                className="cursor-pointer"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => reset()}
              >
                <circle cx="10" cy="10" r="10" fill="#F6F9F9" />
                <path d="M6 6L14 14" stroke="#ABB3BA" strokeLinecap="round" />
                <path d="M14 6L6 14" stroke="#ABB3BA" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="absolute inset-x-3 inset-y-2 w-fit">
            <Downshift
              onInputValueChange={(inputValue) => {
                inputValue.length > 0 ? setSaveMode(true) : setSaveMode(false);
                setTagName(inputValue);
              }}
              onChange={(selectedItem) => selectedItem && setTagName(selectedItem.value)}
              itemToString={(item) => (item ? item.value : '')}
              stateReducer={stateReducer}
            >
              {({ getInputProps, getMenuProps, getRootProps, getItemProps, isOpen, highlightedIndex, inputValue }) => (
                <div>
                  <div {...getRootProps({}, { suppressRefError: true })} className="flex">
                    <input
                      {...getInputProps()}
                      autoFocus
                      type="text"
                      className="appearance-none border-none w-12 inline-block font-normal text-sm/6 text-defaultText"
                    />
                  </div>
                  <ul
                    {...getMenuProps()}
                    className="overflow-x-auto overflow-y-auto mt-1 max-h-60 w-full rounded-md bg-white shadow-lg  ring-black ring-opacity-5 focus:outline-none text-sm/4 z-10"
                  >
                    {isOpen
                      ? items
                          .filter(
                            (item) => !inputValue || (item.value && item.value.toLowerCase().includes(inputValue)),
                          )
                          .map((item, index) => (
                            <li
                              className="cursor-default select-none py-2 px-4 whitespace-nowrap w-fit"
                              {...getItemProps({
                                key: item.value,
                                index,
                                item,
                                style: {
                                  backgroundColor: highlightedIndex === index ? '#EDF2F7' : 'white',
                                },
                              })}
                            >
                              {item.value}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              )}
            </Downshift>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTag;
