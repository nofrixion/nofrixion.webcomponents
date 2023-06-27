import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import classNames from 'classnames';
import PaymentInfo from '../PaymentInfo/PaymentInfo';
import Transactions from '../Transactions/Transactions';
import { LocalPaymentRequest } from '../../../types/LocalTypes';

const tabs = ['Transactions', 'Payment info'];

interface TabProps {
  value: string;
  selectedTab: string;
  children: React.ReactNode;
}

const TabContent: React.FC<TabProps> = ({ value, selectedTab, children }) => {
  return (
    <AnimatePresence>
      <Tabs.Content asChild value={value}>
        <motion.div
          key={selectedTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
        >
          {children}
        </motion.div>
      </Tabs.Content>
    </AnimatePresence>
  );
};

// Get type of classnames
const underlineClasses = 'w-full h-px absolute bottom-0';

interface DetailsTabsProps {
  paymentRequest: LocalPaymentRequest;
  onRefundClick: (paymentAttemptID: string) => void;
}

const DetailsTabs: React.FC<DetailsTabsProps> = ({ paymentRequest, onRefundClick }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <MotionConfig transition={{ ease: 'easeInOut' }}>
      <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
        <Tabs.List className="flex mb-11" aria-label="Explore Payment Request Details">
          {tabs.map((tab) => {
            return (
              <Tabs.Trigger
                key={tab}
                className="relative w-full h-10 select-none text-sm/6 text-greyText transition hover:text-defaultText data-[state=active]:text-defaultText"
                value={tab}
              >
                {tab}

                {selectedTab == tab ? (
                  <motion.div layoutId="underline" className={classNames(underlineClasses, 'bg-primaryGreen z-10')} />
                ) : (
                  <div className={classNames(underlineClasses, 'bg-borderGrey')} />
                )}

                {/* 
                  Underline for when the animation is happening
                  so that the underline doesn't disappear
                */}
                <div className={classNames(underlineClasses, 'bg-borderGrey')} />
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        <TabContent value={tabs[0]} selectedTab={selectedTab}>
          <Transactions transactions={paymentRequest.paymentAttempts} onRefundClicked={onRefundClick}></Transactions>
        </TabContent>
        <TabContent value={tabs[1]} selectedTab={selectedTab}>
          <PaymentInfo paymentRequest={paymentRequest} />
        </TabContent>
      </Tabs.Root>
    </MotionConfig>
  );
};

export default DetailsTabs;
