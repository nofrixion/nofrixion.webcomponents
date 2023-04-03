import { PaymentRequestStatus } from '../../../api/types/Enums';
import Tab from '../Tab/Tab';
import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import DateRangePicker, { DateRange } from '../DateRangePicker/DateRangePicker';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { usePaymentRequestMetrics } from '../../../api/hooks/usePaymentRequestMetrics';
import PaymentRequestTable from '../PaymentRequestTable/PaymentRequestTable';
import { SortDirection } from '../ColumnHeader/ColumnHeader';
import { PaymentRequestClient } from '../../../api/clients/PaymentRequestClient';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import { LocalPaymentRequest } from '../../../api/types/LocalTypes';
import { makeToast } from '../Toast/Toast';
import { RemotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import classNames from 'classnames';
import './Tabs.css';

interface PaymentRequestDashboardProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
}

const PaymentRequestDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
}: PaymentRequestDashboardProps) => {
  const [page, setPage] = useState(1);
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [contactSortDirection, setContactSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [selectedTab, setSelectedTab] = useState('allTab');
  const [status, setStatus] = useState<PaymentRequestStatus>(PaymentRequestStatus.All);
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const pageSize = 20;

  const client = new PaymentRequestClient(apiUrl, token);

  const tabCss = 'bg-white p-6 h-full';

  const { paymentRequests, totalRecords, fetchPaymentRequests } = usePaymentRequests(
    apiUrl,
    token,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    page,
    pageSize,
    dateRange.fromDate,
    dateRange.toDate,
    status,
  );

  const localPaymentRequests: LocalPaymentRequest[] = paymentRequests.map((paymentRequest) =>
    RemotePaymentRequestToLocalPaymentRequest(paymentRequest),
  );

  const { metrics, apiError } = usePaymentRequestMetrics(apiUrl, token, dateRange.fromDate, dateRange.toDate);

  const onDeletePaymentRequest = async (paymentRequest: LocalPaymentRequest) => {
    const response = await client.delete(paymentRequest.id);

    if (response.error) {
      makeToast('error', response.error.title);
      return;
    }

    makeToast('success', 'Payment request successfully deleted.');

    await fetchPaymentRequests();
  };

  const onCopyPaymentRequestLink = async (paymentRequest: LocalPaymentRequest) => {
    let link = `${apiUrl}/nextgen/pay/${paymentRequest.id}`;
    await navigator.clipboard.writeText(link);

    makeToast('success', 'Link copied into clipboard.');
  };

  const onDuplicatePaymentRequest = (paymentRequest: LocalPaymentRequest) => {
    console.log('Duplicate payment request clicked: ', paymentRequest);
  };

  const onCreatePaymentRequest = () => {
    console.log('Create payment request clicked.');
  };

  useEffect(() => {
    switch (selectedTab) {
      case 'allTab':
        setStatus(PaymentRequestStatus.All);
        break;
      case 'unpaidTab':
        setStatus(PaymentRequestStatus.None);
        break;
      case 'partiallyPaidTab':
        setStatus(PaymentRequestStatus.PartiallyPaid);
        break;
      case 'paidTab':
        setStatus(PaymentRequestStatus.FullyPaid);
        break;
    }
  }, [selectedTab]);

  return (
    <div className="bg-mainGrey text-defaultText h-full pl-8 pr-8 pb-10">
      <div className="flex justify-between">
        <div className="flex">
          <div className="pl-12 pt-[72px] pb-[68px] leading-8 font-medium text-[1.75rem]">
            <span>Payment requests</span>
          </div>
          <div className="pl-12 pt-[69px]">
            <DateRangePicker onDateChange={(dateRange) => setDateRange(dateRange)}></DateRangePicker>
          </div>
        </div>
        <div className="flex pr-10">
          <div className="pl-12 pt-[76px] font-medium text-base cursor-pointer hover:text-controlGreyHover">
            <span>Settings</span>
          </div>
          <div className="pt-16 pl-8">
            <PrimaryButton label="Create payment request" onClick={() => onCreatePaymentRequest()}></PrimaryButton>
          </div>
        </div>
      </div>

      <div className="h-full">
        <Tabs.Root className="TabsRoot" defaultValue="allTab" onValueChange={(value) => setSelectedTab(value)}>
          <Tabs.List className="TabsList">
            <Tabs.Trigger className="TabsTrigger" value="allTab" disabled={metrics?.all === 0}>
              <Tab status={PaymentRequestStatus.All} totalRecords={metrics?.all ?? 0}></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="unpaidTab" disabled={metrics?.unpaid === 0}>
              <Tab status={PaymentRequestStatus.None} totalRecords={metrics?.unpaid ?? 0}></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="partiallyPaidTab" disabled={metrics?.partiallyPaid === 0}>
              <Tab status={PaymentRequestStatus.PartiallyPaid} totalRecords={metrics?.partiallyPaid ?? 0}></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="paidTab" disabled={metrics?.paid === 0}>
              <Tab status={PaymentRequestStatus.FullyPaid} totalRecords={metrics?.paid ?? 0}></Tab>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="allTab">
            <div className={classNames(tabCss)}>
              <PaymentRequestTable
                paymentRequests={localPaymentRequests}
                pageSize={pageSize}
                totalRecords={totalRecords}
                onPageChanged={setPage}
                setStatusSortDirection={setStatusSortDirection}
                setCreatedSortDirection={setCreatedSortDirection}
                setContactSortDirection={setContactSortDirection}
                setAmountSortDirection={setAmountSortDirection}
                onPaymentRequestDuplicateClicked={onDuplicatePaymentRequest}
                onPaymentRequestDeleteClicked={onDeletePaymentRequest}
                onPaymentRequestCopyLinkClicked={onCopyPaymentRequestLink}
              ></PaymentRequestTable>
            </div>
          </Tabs.Content>
          <Tabs.Content value="unpaidTab">
            <div className={classNames(tabCss)}>
              <PaymentRequestTable
                paymentRequests={localPaymentRequests}
                pageSize={pageSize}
                totalRecords={totalRecords}
                onPageChanged={setPage}
                setStatusSortDirection={setStatusSortDirection}
                setCreatedSortDirection={setCreatedSortDirection}
                setContactSortDirection={setContactSortDirection}
                setAmountSortDirection={setAmountSortDirection}
                onPaymentRequestDuplicateClicked={onDuplicatePaymentRequest}
                onPaymentRequestDeleteClicked={onDeletePaymentRequest}
                onPaymentRequestCopyLinkClicked={onCopyPaymentRequestLink}
              ></PaymentRequestTable>
            </div>
          </Tabs.Content>
          <Tabs.Content value="partiallyPaidTab">
            <div className={classNames(tabCss)}>
              <PaymentRequestTable
                paymentRequests={localPaymentRequests}
                pageSize={pageSize}
                totalRecords={totalRecords}
                onPageChanged={setPage}
                setStatusSortDirection={setStatusSortDirection}
                setCreatedSortDirection={setCreatedSortDirection}
                setContactSortDirection={setContactSortDirection}
                setAmountSortDirection={setAmountSortDirection}
                onPaymentRequestDuplicateClicked={onDuplicatePaymentRequest}
                onPaymentRequestDeleteClicked={onDeletePaymentRequest}
                onPaymentRequestCopyLinkClicked={onCopyPaymentRequestLink}
              ></PaymentRequestTable>
            </div>
          </Tabs.Content>
          <Tabs.Content value="paidTab">
            <div className={classNames(tabCss)}>
              <PaymentRequestTable
                paymentRequests={localPaymentRequests}
                pageSize={pageSize}
                totalRecords={totalRecords}
                onPageChanged={setPage}
                setStatusSortDirection={setStatusSortDirection}
                setCreatedSortDirection={setCreatedSortDirection}
                setContactSortDirection={setContactSortDirection}
                setAmountSortDirection={setAmountSortDirection}
                onPaymentRequestDuplicateClicked={onDuplicatePaymentRequest}
                onPaymentRequestDeleteClicked={onDeletePaymentRequest}
                onPaymentRequestCopyLinkClicked={onCopyPaymentRequestLink}
              ></PaymentRequestTable>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default PaymentRequestDashboard;
