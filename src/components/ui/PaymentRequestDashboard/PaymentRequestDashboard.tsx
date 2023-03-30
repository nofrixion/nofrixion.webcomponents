import { PaymentRequestStatus } from '../../../api/types/Enums';
import Tab from '../Tab/Tab';
import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';

const PaymentRequestDashboard = () => {
  const [allTabSelected, setAllTabSelected] = useState(true);
  const [unpaidTabSelected, setUnpaidTabSelected] = useState(false);
  const [partiallyPaidTabSelected, setPartiallyPaidTabSelected] = useState(false);
  const [paidTabSelected, setPaidTabSelected] = useState(false);
  const [selectedTab, setSelectedTab] = useState('allTab');

  useEffect(() => {
    switch (selectedTab) {
      case 'allTab':
        setAllTabSelected(true);
        setUnpaidTabSelected(false);
        setPartiallyPaidTabSelected(false);
        setPaidTabSelected(false);
        break;
      case 'unpaidTab':
        setUnpaidTabSelected(true);
        setAllTabSelected(false);
        setPartiallyPaidTabSelected(false);
        setPaidTabSelected(false);
        break;
      case 'partiallyPaidTab':
        setPartiallyPaidTabSelected(true);
        setUnpaidTabSelected(false);
        setAllTabSelected(false);
        setPaidTabSelected(false);
        break;
      case 'paidTab':
        setPaidTabSelected(true);
        setPartiallyPaidTabSelected(false);
        setUnpaidTabSelected(false);
        setAllTabSelected(false);
        break;
    }
  }, [selectedTab]);

  return (
    <Tabs.Root defaultValue="allTab" onValueChange={(value) => setSelectedTab(value)}>
      <Tabs.List>
        <Tabs.Trigger value="allTab">
          <Tab
            status={PaymentRequestStatus.All}
            totalRecords={123}
            selected={allTabSelected}
            onSelect={() => {
              console.log('All');
            }}
          ></Tab>
        </Tabs.Trigger>
        <Tabs.Trigger value="unpaidTab">
          <Tab
            status={PaymentRequestStatus.None}
            totalRecords={77}
            selected={unpaidTabSelected}
            onSelect={() => {
              console.log('All');
            }}
          ></Tab>
        </Tabs.Trigger>
        <Tabs.Trigger value="partiallyPaidTab">
          <Tab
            status={PaymentRequestStatus.PartiallyPaid}
            totalRecords={234}
            selected={partiallyPaidTabSelected}
            onSelect={() => {
              console.log('All');
            }}
          ></Tab>
        </Tabs.Trigger>
        <Tabs.Trigger value="paidTab">
          <Tab
            status={PaymentRequestStatus.FullyPaid}
            totalRecords={234}
            selected={paidTabSelected}
            onSelect={() => {
              console.log('All');
            }}
          ></Tab>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="allTab">
        <p>All tab</p>
      </Tabs.Content>
      <Tabs.Content value="unpaidTab">
        <p>Unpaid tab</p>
      </Tabs.Content>
      <Tabs.Content value="partiallyPaidTab">
        <p>Partially paid tab</p>
      </Tabs.Content>
      <Tabs.Content value="paidTab">
        <p>Paid tab</p>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default PaymentRequestDashboard;
