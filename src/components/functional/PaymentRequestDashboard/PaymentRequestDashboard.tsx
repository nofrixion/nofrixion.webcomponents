import { PaymentRequestStatus } from '../../../api/types/Enums';
import Tab from '../../ui/Tab/Tab';
import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import DateRangePicker, { DateRange } from '../../ui/DateRangePicker/DateRangePicker';
import PrimaryButton from '../../ui/PrimaryButton/PrimaryButton';
import { usePaymentRequestMetrics } from '../../../api/hooks/usePaymentRequestMetrics';
import PaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable';
import { SortDirection } from '../../ui/ColumnHeader/ColumnHeader';
import { PaymentRequestClient } from '../../../api/clients/PaymentRequestClient';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import { LocalPaymentRequest } from '../../../api/types/LocalTypes';
import { makeToast } from '../../ui/Toast/Toast';
import { RemotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import classNames from 'classnames';
import CreatePaymentRequestPage from '../../functional/CreatePaymentRequestPage/CreatePaymentRequestPage';

interface PaymentRequestDashboardProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string;
}

const PaymentRequestDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
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

  let [isCreatePaymentRequestOpen, setIsCreatePaymentRequestOpen] = useState(false);

  const tabsTriggerClassNames = (status: PaymentRequestStatus) => {
    return classNames(
      "text-greyText hover:text-defaultText hover:bg-[#F0F2F5] hover:cursor-pointer pt-0 h-20 data-[state='active']:text-defaultText data-[state='active']:bg-white data-[state='active']:cursor-default data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed focus:relative",
      {
        "data-[state='active']:shadow-[inset_0_2px_0px_#00B2B2]": status === PaymentRequestStatus.All,
        "data-[state='active']:shadow-[inset_0_2px_0px_#E88C30]": status === PaymentRequestStatus.PartiallyPaid,
        "data-[state='active']:shadow-[inset_0_2px_0px_#ABB2BA]": status === PaymentRequestStatus.None,
        "data-[state='active']:shadow-[inset_0_2px_0px_#00CC88]": status === PaymentRequestStatus.FullyPaid,
      },
    );
  };

  const tabsContentClasses = 'bg-white p-6 h-full';

  const pageSize = 20;
  const nextGenUrl = `${apiUrl}/nextgen/pay`;

  const client = new PaymentRequestClient(apiUrl, token, merchantId);

  const { paymentRequests, totalRecords, fetchPaymentRequests } = usePaymentRequests(
    apiUrl,
    token,
    merchantId,
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

  const { metrics, apiError } = usePaymentRequestMetrics(
    apiUrl,
    token,
    merchantId,
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
    let link = `${nextGenUrl}/${paymentRequest.id}`;
    await navigator.clipboard.writeText(link);

    makeToast('success', 'Link copied into clipboard.');
  };

  const onDuplicatePaymentRequest = (paymentRequest: LocalPaymentRequest) => {
    console.log('Duplicate payment request clicked: ', paymentRequest);
  };

  const onCreatePaymentRequest = () => {
    setIsCreatePaymentRequestOpen(true);
  };

  // TODO: We'd receive the payment request created
  // from the create payment request page component
  // and would be good add it to the table. For now, we just refresh the table.
  // Also, when the page exits we don't know for sure
  // if the PR was created. We need to handle
  // the loading and error states inside the page.
  const onCloseCreatePaymentRequest = async () => {
    setIsCreatePaymentRequestOpen(false);

    // Refresh the payment requests table
    // TODO: Table is not refreshing
    await fetchPaymentRequests();
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
          <div className="pl-4 pt-[72px] pb-[68px] leading-8 font-medium text-[1.75rem]">
            <span>Payment requests</span>
          </div>
          <div className="pl-12 pt-[69px]">
            <DateRangePicker onDateChange={(dateRange) => setDateRange(dateRange)}></DateRangePicker>
          </div>
        </div>
        <div className="flex pr-6">
          <div className="pl-12 pt-16 font-medium text-base cursor-pointer">
            <PrimaryButton
              label="Settings"
              className="text-defaultText hover:bg-greyBg font-normal"
              onClick={() => {}}
            ></PrimaryButton>
          </div>
          <div className="pt-16 pl-2">
            <PrimaryButton
              label="Create payment request"
              className="text-white bg-primaryGreen hover:bg-primaryGreenHover"
              onClick={() => onCreatePaymentRequest()}
            ></PrimaryButton>
          </div>
        </div>
      </div>

      <div className="h-full">
        <Tabs.Root defaultValue="allTab" onValueChange={(value) => setSelectedTab(value)}>
          <Tabs.List className="flex shrink-0">
            <Tabs.Trigger className={tabsTriggerClassNames(status)} value="allTab" disabled={metrics?.all === 0}>
              <Tab status={PaymentRequestStatus.All} totalRecords={metrics?.all ?? 0}></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger className={tabsTriggerClassNames(status)} value="unpaidTab" disabled={metrics?.unpaid === 0}>
              <Tab status={PaymentRequestStatus.None} totalRecords={metrics?.unpaid ?? 0}></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger
              className={tabsTriggerClassNames(status)}
              value="partiallyPaidTab"
              disabled={metrics?.partiallyPaid === 0}
            >
              <Tab status={PaymentRequestStatus.PartiallyPaid} totalRecords={metrics?.partiallyPaid ?? 0}></Tab>
            </Tabs.Trigger>
            <Tabs.Trigger className={tabsTriggerClassNames(status)} value="paidTab" disabled={metrics?.paid === 0}>
              <Tab status={PaymentRequestStatus.FullyPaid} totalRecords={metrics?.paid ?? 0}></Tab>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={tabsContentClasses} value="allTab">
            <div>
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
              />
            </div>
          </Tabs.Content>
          <Tabs.Content className={tabsContentClasses} value="unpaidTab">
            <div>
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
              />
            </div>
          </Tabs.Content>
          <Tabs.Content className={tabsContentClasses} value="partiallyPaidTab">
            <div>
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
              />
            </div>
          </Tabs.Content>
          <Tabs.Content className={tabsContentClasses} value="paidTab">
            <div>
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
              />
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <CreatePaymentRequestPage
        isOpen={isCreatePaymentRequestOpen}
        onClose={onCloseCreatePaymentRequest}
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
      />
    </div>
  );
};

PaymentRequestDashboard.componentProps = {
  token: String,
  apiUrl: String,
};

export default PaymentRequestDashboard;
