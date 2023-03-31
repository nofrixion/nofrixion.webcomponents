import { PaymentRequestStatus } from '../../../api/types/Enums';
import Tab from '../Tab/Tab';
import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { PaymentRequestMetrics } from '../../../api/types/ApiResponses';
import { PaymentRequestClient } from '../../../api/clients/PaymentRequestClient';
import { usePaymentRequestMetrics } from '../../../api/hooks/usePaymentRequestMetrics';

interface PaymentRequestDashboardProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
}

const PaymentRequestDashboard = ({
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbmlkIjoiN2ZlYmE3MWEtNzM0OS00YTgyLThjOTctODRkZmFkNDRiMTdiIn0.j91GfvpEQeKk2v4XdKH6cDbWz-6rBFomYRdulnti_94',
  apiUrl = 'https://api-dev.nofrixion.com/api/v1',
}: PaymentRequestDashboardProps) => {
  const [allTabSelected, setAllTabSelected] = useState(true);
  const [unpaidTabSelected, setUnpaidTabSelected] = useState(false);
  const [partiallyPaidTabSelected, setPartiallyPaidTabSelected] = useState(false);
  const [paidTabSelected, setPaidTabSelected] = useState(false);
  const [selectedTab, setSelectedTab] = useState('allTab');

  const { paymentRequestMetrics, totalRecords, apiError } = usePaymentRequestMetrics(apiUrl, token);

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
    <div className="bg-mainGrey text-defaultText">
      <div className="flex justify-between">
        <div className="flex">
          <div className="pl-12 pt-[72px] pb-[68px] leading-8 font-medium text-[28px]">
            <span>Payment Requests</span>
          </div>
          <div className="pl-12 pt-[69px]">
            <DateRangePicker onDateChange={(dateRange) => console.log(dateRange)}></DateRangePicker>
          </div>
        </div>
        <div className="flex pr-10">
          <div className="pl-12 pt-[76px] font-medium text-base cursor-pointer hover:text-controlGreyHover">
            <span>Settings</span>
          </div>
          <div className="pt-16 pl-8">
            <PrimaryButton
              label="Create payment request"
              onClick={() => console.log('Create payment request')}
            ></PrimaryButton>
          </div>
        </div>
      </div>

      <div className="pl-8">
        <Tabs.Root defaultValue="allTab" onValueChange={(value) => setSelectedTab(value)}>
          <Tabs.List>
            <Tabs.Trigger value="allTab">
              <Tab
                status={PaymentRequestStatus.All}
                totalRecords={paymentRequestMetrics?.all ?? 0}
                selected={allTabSelected}
                onSelect={() => {
                  console.log('All');
                }}
              ></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger value="unpaidTab">
              <Tab
                status={PaymentRequestStatus.None}
                totalRecords={paymentRequestMetrics?.unpaid ?? 0}
                selected={unpaidTabSelected}
                onSelect={() => {
                  console.log('Unpaid');
                }}
              ></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger value="partiallyPaidTab">
              <Tab
                status={PaymentRequestStatus.PartiallyPaid}
                totalRecords={paymentRequestMetrics?.partiallyPaid ?? 0}
                selected={partiallyPaidTabSelected}
                onSelect={() => {
                  console.log('Partially paid');
                }}
              ></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger value="paidTab">
              <Tab
                status={PaymentRequestStatus.FullyPaid}
                totalRecords={paymentRequestMetrics?.paid ?? 0}
                selected={paidTabSelected}
                onSelect={() => {
                  console.log('Paid');
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
      </div>
    </div>
  );
};

export default PaymentRequestDashboard;
