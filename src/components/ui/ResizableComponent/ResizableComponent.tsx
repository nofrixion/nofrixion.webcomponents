import { motion, MotionConfig } from 'framer-motion';
import { PropsWithChildren } from 'react';
import useMeasure from 'react-use-measure';

const ResizableComponent: React.FC<PropsWithChildren> = ({ children }) => {
  let [ref, { width }] = useMeasure();

  return (
    <MotionConfig transition={{ duration: 0.25 }}>
      <motion.div animate={{ width: width }} className="overflow-hidden">
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          animate={{ opacity: 1, transition: { ease: 'easeOut', duration: 1 } }}
          initial={{ opacity: 0.6 }}
          className="w-fit"
        >
          <div ref={ref}>{children}</div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: string, value: object | null) => {
    if (key.startsWith('_')) return; // Don't compare React's internal props.
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};

export default ResizableComponent;
