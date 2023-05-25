import { useEffect, useState } from 'react';
import Downshift from 'downshift';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { LocalTag } from '../../../../types/LocalTypes';
import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

interface TagProps {
  tags: LocalTag[];
  availableTags: LocalTag[];
  onTagAdded?: (tag: LocalTag) => void;
  onTagCreated?: (tag: LocalTag) => void;
}

const AddTag = ({ tags, availableTags, onTagAdded, onTagCreated }: TagProps) => {
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState('');
  const [ref, { width }] = useMeasure();
  const componentRef = useRef(null);

  const reset = () => {
    setTagName('');
    setEditMode(false);
  };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        reset();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const handleClickOutside = () => {
    reset();
  };

  useOnClickOutside(componentRef, handleClickOutside);

  const animationDuration = 0.2;

  const Layout = ({ children }: { children: React.ReactNode }) => {
    return <motion.div layout="position">{children}</motion.div>;
  };

  const saveTag = () => {
    var existingTag = availableTags.find((tag) => tag.name?.toLowerCase() === tagName.toLowerCase());

    if (existingTag) {
      onTagAdded && onTagAdded(existingTag);
    } else {
      onTagCreated &&
        onTagCreated({
          name: tagName,
          ID: uuidv4(), // This is here to make sure the tag key is unique in the list
        });
    }
    reset();
  };

  const items = availableTags.map((tag) => ({ value: tag.name }));

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

  const itemEnabled = (item: string): boolean => {
    return tags.findIndex((tag) => tag.name === item) === -1;
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
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: animationDuration }}
          className="inline-flex items-center space-x-1 max-h-[2.0625rem] text-greyText hover:text-defaultText px-3 py-2 rounded-full text-sm leading-4 border-borderGrey border-[1px] border-dashed hover:border-solid hover:border-controlGreyHover whitespace-nowrap align-middle select-none cursor-pointer"
        >
          <div onClick={() => setEditMode(true)}>
            <span>Add tag</span>
          </div>
        </motion.div>
      )}

      {editMode && (
        <MotionConfig transition={{ duration: animationDuration }}>
          <motion.div
            animate={{ width: width + 8 }}
            className="relative inline-flex text-defaultText min-h-[2.0625rem] max-h-[2.0625rem] py-2 rounded-full border-borderGrey border-[1px] border-solid text-sm leading-4 whitespace-nowrap align-middle select-none"
            ref={componentRef}
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
                        className="appearance-none outline-none border-none min-w-[3rem] max-w-[10rem] inline-block text-sm leading-4 text-defaultText"
                        style={{ width: `${tagName.length * 8}px` }}
                      />
                    </div>
                    {isOpen && (
                      <motion.ul
                        initial={'closed'}
                        animate={'open'}
                        exit={'closed'}
                        variants={variants}
                        {...getMenuProps()}
                        className="z-50 absolute overflow-x-auto overflow-y-auto max-h-60 w-fit rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none text-sm/4"
                      >
                        {isOpen
                          ? items
                              .filter(
                                (item) =>
                                  !inputValue ||
                                  (item.value && item.value.toLowerCase().includes(inputValue.toLowerCase())),
                              )
                              .map((item, index) => (
                                <li
                                  className={classNames(
                                    'cursor-default select-none py-2 px-4 whitespace-nowrap w-full',
                                    {
                                      'pointer-events-none text-disabledText': !itemEnabled(item.value),
                                    },
                                  )}
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
