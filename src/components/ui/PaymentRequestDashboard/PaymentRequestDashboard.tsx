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
  const [allTabSelected, setAllTabSelected] = useState(true);
  const [unpaidTabSelected, setUnpaidTabSelected] = useState(false);
  const [partiallyPaidTabSelected, setPartiallyPaidTabSelected] = useState(false);
  const [paidTabSelected, setPaidTabSelected] = useState(false);
  const [selectedTab, setSelectedTab] = useState('allTab');
  const [status, setStatus] = useState<PaymentRequestStatus>(PaymentRequestStatus.All);
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const pageSize = 20;

  const client = new PaymentRequestClient(apiUrl, token);

  const tabCss = 'bg-white pt-10 pb-10 pl-10 pr-10 h-full';

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

  const { paymentRequestMetrics, apiError } = usePaymentRequestMetrics(
    apiUrl,
    token,
    dateRange.fromDate,
    dateRange.toDate,
  );

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
            <PrimaryButton
              label="Create payment request"
              onClick={() => console.log('Create payment request')}
            ></PrimaryButton>
          </div>
        </div>
      </div>

      <div className="h-full">
        <Tabs.Root defaultValue="allTab" onValueChange={(value) => setSelectedTab(value)}>
          <Tabs.List>
            <Tabs.Trigger value="allTab" disabled={paymentRequestMetrics?.all === 0}>
              <Tab
                status={PaymentRequestStatus.All}
                totalRecords={paymentRequestMetrics?.all ?? 0}
                selected={allTabSelected}
                onSelect={() => setStatus(PaymentRequestStatus.All)}
              ></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger value="unpaidTab" disabled={paymentRequestMetrics?.unpaid === 0}>
              <Tab
                status={PaymentRequestStatus.None}
                totalRecords={paymentRequestMetrics?.unpaid ?? 0}
                selected={unpaidTabSelected}
                onSelect={() => setStatus(PaymentRequestStatus.None)}
              ></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger value="partiallyPaidTab" disabled={paymentRequestMetrics?.partiallyPaid === 0}>
              <Tab
                status={PaymentRequestStatus.PartiallyPaid}
                totalRecords={paymentRequestMetrics?.partiallyPaid ?? 0}
                selected={partiallyPaidTabSelected}
                onSelect={() => setStatus(PaymentRequestStatus.PartiallyPaid)}
              ></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger value="paidTab" disabled={paymentRequestMetrics?.paid === 0}>
              <Tab
                status={PaymentRequestStatus.FullyPaid}
                totalRecords={paymentRequestMetrics?.paid ?? 0}
                selected={paidTabSelected}
                onSelect={() => setStatus(PaymentRequestStatus.FullyPaid)}
              ></Tab>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="allTab">
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
