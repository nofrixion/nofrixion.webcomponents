import { useState } from 'react';
import { Tag } from '../../../../api/types/ApiResponses';
import Downshift from 'downshift';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { LocalTag } from '../../../../api/types/LocalTypes';
import uuid from 'react-uuid';

interface TagProps {
  tags: LocalTag[];
  onTagAdded?: (tag: LocalTag) => void;
}

const AddTag = ({ tags, onTagAdded }: TagProps) => {
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState('');
  const [ref, { width }] = useMeasure();

  const animationDuration = 0.2;

  const Layout = ({ children }: { children: React.ReactNode }) => {
    return <motion.div layout="position">{children}</motion.div>;
  };

  const reset = () => {
    setTagName('');
    setEditMode(false);
  };

  const saveTag = () => {
    var existingTag = tags.find((tag) => tag.name?.toLowerCase() === tagName.toLowerCase());

    if (existingTag) {
      onTagAdded && onTagAdded(existingTag);
    } else {
      onTagAdded &&
        onTagAdded({
          name: tagName,
          ID: uuid(), // For uniqueness
        });
    }
    reset();
  };

  const items = tags.map((tag) => ({ value: tag.name }));

  const stateReducer = (state: any, changes: any) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.mouseUp:
        // This prevents DownShift from clearing the input value on mouseUp
        return {
          ...changes,
          isOpen: true,
          inputValue: state.inputValue,
        };
      default:
        return changes;
    }
  };

  const variants = {
    open: { opacity: 1, scale: 1, transition: { ease: 'easeOut', duration: 0.1 } },
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: { ease: 'easeIn', duration: 0.075 },
    },
  };

  return (
    <>
      {!editMode && (
        <div className="inline-flex items-center space-x-1 text-defaultText transition h-10 px-3 py-2 rounded-full border-borderGrey border-[1px] border-dashed hover:border-solid hover:border-controlGreyHover text-sm whitespace-nowrap align-middle select-none cursor-pointer">
          <div onClick={() => setEditMode(true)}>
            <span>Add tag</span>
          </div>
        </div>
      )}

      {editMode && (
        <MotionConfig transition={{ duration: animationDuration }}>
          <motion.div
            animate={{ width: width + 8 }}
            className="relative inline-flex text-defaultText transition py-2 rounded-full border-borderGrey border-[1px] border-solid h-10 text-sm whitespace-nowrap align-middle select-none"
          >
            <div ref={ref} className="inline-flex items-center space-x-1 pl-3">
              <Downshift
                onInputValueChange={(inputValue) => {
                  setTagName(inputValue);
                }}
                onChange={(selectedItem) => selectedItem && setTagName(selectedItem.value)}
                itemToString={(item) => (item ? item.value : '')}
                stateReducer={stateReducer}
              >
                {({
                  getInputProps,
                  getMenuProps,
                  getRootProps,
                  getItemProps,
                  isOpen,
                  highlightedIndex,
                  inputValue,
                }) => (
                  <div>
                    <div {...getRootProps({}, { suppressRefError: true })}>
                      <input
                        {...getInputProps()}
                        autoFocus
                        type="text"
                        className="appearance-none outline-none border-none min-w-[3rem] max-w-[10rem] inline-block font-normal text-sm/6 text-defaultText"
                        style={{ width: `${tagName.length * 8}px` }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            saveTag();
                          }
                          if (e.key === 'Escape') {
                            e.preventDefault();
                            reset();
                          }
                        }}
                      />
                    </div>
                    {isOpen && (
                      <motion.ul
                        initial={'closed'}
                        animate={'open'}
                        exit={'closed'}
                        variants={variants}
                        {...getMenuProps()}
                        className="absolute overflow-x-auto overflow-y-auto max-h-60 w-fit rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none text-sm/4"
                      >
                        {isOpen
                          ? items
                              .filter(
                                (item) => !inputValue || (item.value && item.value.toLowerCase().includes(inputValue)),
                              )
                              .map((item, index) => (
                                <li
                                  className="cursor-default select-none py-2 px-4 whitespace-nowrap w-full"
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
                      </motion.ul>
                    )}
                  </div>
                )}
              </Downshift>
              <AnimatePresence>
                {tagName.length > 0 && (
                  <Layout key="save">
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
                  </Layout>
                )}
                <motion.div
                  layout="position"
                  transition={{
                    layout: { duration: animationDuration },
                  }}
                >
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
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </MotionConfig>
      )}
    </>
  );
};

export default AddTag;
