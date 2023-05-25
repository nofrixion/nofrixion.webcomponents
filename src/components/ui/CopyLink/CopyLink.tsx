import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CopyLinkIcon from '../../../assets/icons/copy-link-icon.svg';
import TickMarkIcon from '../../../assets/icons/tick-mark-icon.svg';

export const CopyLink = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  // Reset copied state after 1.5 seconds to allow user to copy again
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <div className="flex items-center h-10 rounded-full justify-between px-4 pr-4 shadow-[0_0_0.5rem_rgba(4,41,49,0.15)] text-[0.813rem] relative bg-white">
      <span className="whitespace-nowrap overflow-x-clip">{link}</span>
      <div className="w-14 h-6 bg-gradient-to-l from-white right-[5.5rem] absolute pointer-events-none"></div>
      <AnimatePresence>
        {!copied ? (
          <motion.div
            key="copy-link"
            onClick={copyLink}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-[0.281rem] rounded-full py-1 px-2 bg-white hover:bg-[#DEE5ED] transition duration-300 cursor-pointer z-0 absolute right-0 mr-2"
          >
            <img src={CopyLinkIcon} alt="copyLink" />
            <span className="text-xs">Copy link</span>
          </motion.div>
        ) : (
          <motion.div
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-2 flex items-center gap-[0.354rem] rounded-full py-1 px-4 bg-[#CFFCED] z-50 absolute right-0 mr-2"
          >
            <img src={TickMarkIcon} alt="linkCopied" />
            <span className="text-xs">Copied</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
