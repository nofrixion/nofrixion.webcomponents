import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import classNames from 'classnames';

interface ScrollAreaProps {
  children: React.ReactNode;
  hideScrollbar?: boolean;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children, hideScrollbar = false }) => {
  return (
    <RadixScrollArea.Root>
      <RadixScrollArea.Viewport>{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className={classNames('flex select-none overflow-hidden touch-none', {
          'rounded-b-md bg-gray-100 transition-colors duration-[160ms] ease-out hover:bg-gray-200 flex-col h-2':
            !hideScrollbar,
        })}
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="flex-1 bg-gray-300" />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  );
};

export default ScrollArea;
