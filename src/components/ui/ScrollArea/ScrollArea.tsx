import * as RadixScrollArea from '@radix-ui/react-scroll-area';

interface ScrollAreaProps {
  children: React.ReactNode;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
  return (
    <RadixScrollArea.Root>
      <RadixScrollArea.Viewport>{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className="flex select-none overflow-hidden touch-none rounded-b-md bg-gray-100 transition-colors duration-[160ms] ease-out hover:bg-gray-200 flex-col h-2"
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="flex-1 bg-gray-300" />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  );
};

export default ScrollArea;
