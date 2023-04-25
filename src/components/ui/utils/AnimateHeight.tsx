import { motion } from 'framer-motion';

const AnimateHeightWrapper = ({ children, key }: { children: React.ReactNode; key: string }) => {
  return (
    <motion.div
      key={key}
      className="overflow-hidden"
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
