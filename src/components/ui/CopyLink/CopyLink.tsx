import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const CopyLink = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <div className="flex items-center h-10 rounded-full justify-between px-4 shadow-[0_0_8px_rgba(4,41,49,0.15)] text-[13px] relative">
      <span className="absolute">{link}</span>
      <AnimatePresence>
        {!copied ? (
          <motion.div
            key="copy-link"
            onClick={copyLink}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center ml-2 gap-[4.5px] rounded-full py-1 px-2 hover:bg-[#DEE5ED] transition duration-300 z-0 absolute right-0 mr-4 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.24269 12.3333L5.62135 12.9546C5.05874 13.5172 4.29567 13.8333 3.50002 13.8333C2.70436 13.8333 1.9413 13.5172 1.37869 12.9546C0.816073 12.392 0.5 11.6289 0.5 10.8333C0.5 10.0376 0.816073 9.27455 1.37869 8.71194L4.56069 5.52927C5.09417 4.99459 5.8097 4.68081 6.56441 4.6506C7.31911 4.62039 8.05744 4.87597 8.63195 5.3663C9.20647 5.85664 9.57488 6.54564 9.66362 7.29571C9.75237 8.04579 9.55491 8.80174 9.11069 9.41261"
                stroke="#454D54"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.87855 3.71145L10.3786 3.21145C10.9412 2.64884 11.7042 2.33276 12.4999 2.33276C13.2955 2.33276 14.0586 2.64884 14.6212 3.21145C15.1838 3.77406 15.4999 4.53713 15.4999 5.33278C15.4999 6.12844 15.1838 6.8915 14.6212 7.45412L11.4392 10.6361C10.9056 11.1706 10.1901 11.4841 9.43546 11.5142C8.68083 11.5442 7.94263 11.2885 7.36826 10.7981C6.79389 10.3077 6.4256 9.61878 6.33692 8.86877C6.24825 8.11877 6.44571 7.36291 6.88988 6.75212"
                stroke="#454D54"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="text-xs">Copy link</span>
          </motion.div>
        ) : (
          <motion.div
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-2 flex items-center gap-[5.67px] rounded-full py-1 px-4 bg-[#CFFCED] z-50 absolute right-0 mr-4"
          >
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3333 1.33335L4.66665 10L1 6.33335"
                stroke="#454D54"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-xs">Copied</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
