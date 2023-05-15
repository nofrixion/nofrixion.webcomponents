import * as Tooltip from '@radix-ui/react-tooltip';

import InfoIcon from '../../../assets/icons/info-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface InfoTooltipProps {
  content: string;
  children?: React.ReactNode;
}

const InfoTooltip = ({ content, children }: InfoTooltipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger>
          <>
            {/* If no children show img */}
            {!children && <img src={InfoIcon} className="cursor-pointer w-4 h-4" alt="Info icon" />}

            {children}
          </>
        </Tooltip.Trigger>
        <AnimatePresence>
          {open && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content sideOffset={5} side="top" asChild>
                <motion.div
                  className="rounded-lg p-4 bg-white select-none max-w-xs shadow-[0px_0px_16px_rgba(4,_41,_49,_0.15)] text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {content}
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default InfoTooltip;
