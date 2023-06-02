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
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { makeToast } from '../../ui/Toast/Toast';
import { remotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import CreatePaymentRequestPage from '../../functional/CreatePaymentRequestPage/CreatePaymentRequestPage';
import { add, startOfDay, endOfDay } from 'date-fns';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import LayoutWrapper from '../../ui/utils/LayoutWrapper';
import { PaymentRequestMetrics } from '../../../api/types/ApiResponses';
import PaymentRequestDetailsModal from '../PaymentRequestDetailsModal/PaymentRequestDetailsModal';

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
  const [status, setStatus] = useState<PaymentRequestStatus>(PaymentRequestStatus.All);
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: startOfDay(add(new Date(), { days: -90 })), // Last 90 days as default
    toDate: endOfDay(new Date()),
  });

  let [isCreatePaymentRequestOpen, setIsCreatePaymentRequestOpen] = useState(false);

  const [selectedPaymentRequestID, setSelectedPaymentRequestID] = useState<string | null>(null);

  const pageSize = 20;

  const client = new PaymentRequestClient(apiUrl, token, merchantId);

  const onPaymentRequestRowClicked = (paymentRequest: LocalPaymentRequest) => {
    setSelectedPaymentRequestID(paymentRequest.id);
  };

  const onPaymentRequestDetailsModalDismiss = () => {
    setSelectedPaymentRequestID(null);
  };

  const {
    paymentRequests,
    totalRecords,
    fetchPaymentRequests,
    isLoading: isLoadingPaymentRequests,
  } = usePaymentRequests(
    apiUrl,
    token,
    merchantId,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    page,
    pageSize,
    dateRange.fromDate.getTime(),
    dateRange.toDate.getTime(),
    status,
  );

  const [localPaymentRequests, setLocalPaymentRequests] = useState<LocalPaymentRequest[]>([]);

  const [firstMetrics, setFirstMetrics] = useState<PaymentRequestMetrics | undefined>();

  const { metrics, isLoading: isLoadingMetrics } = usePaymentRequestMetrics(
    apiUrl,
    token,
    merchantId,
    dateRange.fromDate.getTime(),
    dateRange.toDate.getTime(),
  );

  useEffect(() => {
    setLocalPaymentRequests(
      paymentRequests?.map((paymentRequest) => remotePaymentRequestToLocalPaymentRequest(paymentRequest)) ?? [],
    );
  }, [paymentRequests]);

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
    let link = `${paymentRequest.hostedPayCheckoutUrl}/nextgen`;
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

  // tore the results of the first execution of the metrics
  // and use them as the initial state of the metrics.
  // This way, when they change the dates
  // we don't see the metrics disappear
  if (metrics && !firstMetrics) {
    setFirstMetrics(metrics);
  }

  const isInitialState = !isLoadingMetrics && (!firstMetrics || firstMetrics?.all === 0);

  return (
    <div className="font-inter bg-mainGrey text-defaultText h-full pl-8 pr-8 pb-10">
      <div className="flex justify-between">
        <div className="flex">
          <div className="pl-4 pt-[72px] pb-[68px] leading-8 font-medium text-[1.75rem]">
            <span>Payment requests</span>
          </div>
          <AnimatePresence>
            {!isInitialState && (
              <LayoutWrapper className="pl-12 pt-[69px]">
                <DateRangePicker onDateChange={(dateRange) => setDateRange(dateRange)}></DateRangePicker>
              </LayoutWrapper>
            )}
          </AnimatePresence>
        </div>
        <div className="flex pr-6">
          <LayoutGroup>
            <LayoutWrapper className="pl-12 pt-16 font-medium text-base cursor-pointer">
              <PrimaryButton
                label="Settings"
                className="text-defaultText hover:bg-greyBg font-normal"
                onClick={() => {}}
              ></PrimaryButton>
            </LayoutWrapper>
            <AnimatePresence initial={false}>
              {!isInitialState && (
                <LayoutWrapper className="pt-16 pl-2">
                  <PrimaryButton
                    label="Create payment request"
                    className="text-white bg-primaryGreen hover:bg-primaryGreenHover"
                    onClick={onCreatePaymentRequest}
                  ></PrimaryButton>
                </LayoutWrapper>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>

      <LayoutGroup>
        <AnimatePresence initial={false}>
          {!isInitialState && (
            <LayoutWrapper className="h-full">
              <Tabs.Root
                defaultValue={PaymentRequestStatus.All}
                onValueChange={(value) => setStatus(value as PaymentRequestStatus)}
              >
                {/* Keep the Tab to still get accessibility functions through the keyboard */}
                <Tabs.List className="flex shrink-0 gap-x-4 mb-4">
                  <Tab
                    status={PaymentRequestStatus.All}
                    isLoading={isLoadingMetrics}
                    totalRecords={metrics?.all ?? 0}
                  />
                  <Tab
                    status={PaymentRequestStatus.None}
                    isLoading={isLoadingMetrics}
                    totalRecords={metrics?.unpaid ?? 0}
                  />
                  <Tab
                    status={PaymentRequestStatus.PartiallyPaid}
                    isLoading={isLoadingMetrics}
                    totalRecords={metrics?.partiallyPaid ?? 0}
                  />
                  <Tab
                    status={PaymentRequestStatus.FullyPaid}
                    isLoading={isLoadingMetrics}
                    totalRecords={metrics?.paid ?? 0}
                  />
                </Tabs.List>
                <Tabs.Content value=""></Tabs.Content>
              </Tabs.Root>
            </LayoutWrapper>
          )}
        </AnimatePresence>
        <LayoutWrapper className="bg-white min-h-[18rem] py-10 px-6 rounded-lg">
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
            isLoading={isLoadingPaymentRequests}
            isEmpty={isInitialState}
            onCreatePaymentRequest={onCreatePaymentRequest}
            onPaymentRequestClicked={onPaymentRequestRowClicked}
          />
        </LayoutWrapper>
      </LayoutGroup>

      <CreatePaymentRequestPage
        isOpen={isCreatePaymentRequestOpen}
        onClose={onCloseCreatePaymentRequest}
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
      />
      {selectedPaymentRequestID && (
        <PaymentRequestDetailsModal
          token={token}
          apiUrl={apiUrl}
          merchantId={merchantId}
          paymentRequestID={selectedPaymentRequestID}
          open={selectedPaymentRequestID !== undefined}
          onDismiss={onPaymentRequestDetailsModalDismiss}
        ></PaymentRequestDetailsModal>
      )}
    </div>
  );
};

export default PaymentRequestDashboard;
