import { motion } from 'framer-motion';

const AnimateHeightWrapper = ({ children, layoutId }: { children: React.ReactNode; layoutId: string }) => {
  return (
    <motion.div
      layoutId={layoutId}
      className=""
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: 'auto',
        transitionEnd: {
          overflow: 'inherit',
        },
      }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateHeightWrapper;
