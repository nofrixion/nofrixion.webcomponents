import { PaymentRequestStatus } from '../../../api/types/Enums';
import Tab from '../../ui/Tab/Tab';
import * as Tabs from '@radix-ui/react-tabs';
import React, { useEffect, useState } from 'react';
import { DateRange } from '../../ui/DateRangePicker/DateRangePicker';
import PrimaryButton from '../../ui/PrimaryButton/PrimaryButton';
import { usePaymentRequestMetrics } from '../../../api/hooks/usePaymentRequestMetrics';
import PaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable';
import { SortDirection } from '../../ui/ColumnHeader/ColumnHeader';
import { PaymentRequestClient } from '../../../api/clients/PaymentRequestClient';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import { LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import { makeToast } from '../../ui/Toast/Toast';
import { parseApiTagToLocalTag, remotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import CreatePaymentRequestPage from '../../functional/CreatePaymentRequestPage/CreatePaymentRequestPage';
import { add, startOfDay, endOfDay } from 'date-fns';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import LayoutWrapper from '../../ui/utils/LayoutWrapper';
import { PaymentRequestMetrics } from '../../../api/types/ApiResponses';
import PaymentRequestDetailsModal from '../PaymentRequestDetailsModal/PaymentRequestDetailsModal';
import { useMerchantTags } from '../../../api/hooks/useMerchantTags';
import FilterControlsRow from '../../ui/FilterControlsRow/FilterControlsRow';
import { FilterableTag } from '../../ui/TagFilter/TagFilter';
import ScrollArea from '../../ui/ScrollArea/ScrollArea';

interface PaymentRequestDashboardProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
  merchantId: string;
  onUnauthorized: () => void;
}

const PaymentRequestDashboard = ({
  token,
  apiUrl = 'https://api.nofrixion.com/api/v1',
  merchantId,
  onUnauthorized,
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
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [currencyFilter, setCurrencyFilter] = React.useState<string | undefined>();
  const [minAmountFilter, setMinAmountFilter] = React.useState<number | undefined>();
  const [maxAmountFilter, setMaxAmountFilter] = React.useState<number | undefined>();
  const [tags, setTags] = React.useState<FilterableTag[]>([]);
  const [tagsFilter, setTagsFilter] = React.useState<string[]>([]);

  let [isCreatePaymentRequestOpen, setIsCreatePaymentRequestOpen] = useState(false);

  const [selectedPaymentRequestID, setSelectedPaymentRequestID] = useState<string | undefined>(undefined);

  const pageSize = 20;

  const client = new PaymentRequestClient(apiUrl, token, merchantId, onUnauthorized);

  const onPaymentRequestRowClicked = (paymentRequest: LocalPaymentRequest) => {
    setSelectedPaymentRequestID(paymentRequest.id);
  };

  const onPaymentRequestDetailsModalDismiss = () => {
    setSelectedPaymentRequestID(undefined);
  };

  const getSelectedTagFilters = () => {
    if (!tags) {
      return [];
    }

    return tags.filter((tag) => tag.isSelected).map((tag) => tag.id);
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
    onUnauthorized,
    page,
    pageSize,
    dateRange.fromDate.getTime(),
    dateRange.toDate.getTime(),
    status,
    searchFilter?.length >= 3 ? searchFilter : undefined,
    currencyFilter,
    minAmountFilter,
    maxAmountFilter,
    tagsFilter,
  );

  const [localPaymentRequests, setLocalPaymentRequests] = useState<LocalPaymentRequest[]>([]);

  const [firstMetrics, setFirstMetrics] = useState<PaymentRequestMetrics | undefined>();

  const {
    metrics,
    isLoading: isLoadingMetrics,
    fetchPaymentRequestMetrics,
  } = usePaymentRequestMetrics(
    apiUrl,
    token,
    merchantId,
    onUnauthorized,
    dateRange.fromDate.getTime(),
    dateRange.toDate.getTime(),
    searchFilter?.length >= 3 ? searchFilter : undefined,
    currencyFilter,
    minAmountFilter,
    maxAmountFilter,
    tagsFilter,
  );

  const merchantTags = useMerchantTags(apiUrl, token, merchantId, onUnauthorized);

  const [localMerchantTags, setLocalMerchantTags] = useState<LocalTag[]>([] as LocalTag[]);

  useEffect(() => {
    setLocalPaymentRequests(
      paymentRequests?.map((paymentRequest) => remotePaymentRequestToLocalPaymentRequest(paymentRequest)) ?? [],
    );
  }, [paymentRequests]);

  useEffect(() => {
    let tempTagArray = getSelectedTagFilters();
    setTagsFilter([...tempTagArray]);
  }, [tags]);

  useEffect(() => {
    if (merchantTags.tags) {
      setLocalMerchantTags(merchantTags.tags.map((tag) => parseApiTagToLocalTag(tag)));
      setTags(
        merchantTags.tags.map((tag) => {
          return {
            id: tag.id,
            label: tag.name,
            isSelected: false,
          };
        }),
      );
    }
  }, [merchantTags.tags]);

  const onDeletePaymentRequest = async (paymentRequest: LocalPaymentRequest) => {
    const response = await client.delete(paymentRequest.id);

    if (response.error) {
      makeToast('error', response.error.title);
      return;
    }

    makeToast('success', 'Payment request successfully deleted.');

    fetchPaymentRequests();
    fetchPaymentRequestMetrics();
  };

  const onCopyPaymentRequestLink = async (paymentRequest: LocalPaymentRequest) => {
    let link = `${paymentRequest.hostedPayCheckoutUrl}`;
    await navigator.clipboard.writeText(link);

    makeToast('success', 'Link copied into clipboard.');
  };

  const onOpenPaymentPage = async (paymentRequest: LocalPaymentRequest) => {
    window.open(paymentRequest.hostedPayCheckoutUrl, '_blank');
  };

  const onDuplicatePaymentRequest = (paymentRequest: LocalPaymentRequest) => {
    console.log('Duplicate payment request clicked: ', paymentRequest);
  };

  const onCreatePaymentRequest = () => {
    setIsCreatePaymentRequestOpen(true);
  };

  const onCloseCreatePaymentRequest = async () => {
    setIsCreatePaymentRequestOpen(false);
  };

  // Adds the newly created payment request to the top of the list
  // Increments the metrics all and unpaid counts
  // Sets the newly created payment request as the selected one
  const onPaymentRequestCreated = async (paymentRequest: LocalPaymentRequest) => {
    localPaymentRequests.splice(0, 0, paymentRequest);
    if (metrics) {
      metrics.all++;
      metrics.unpaid++;
    }

    setSelectedPaymentRequestID(paymentRequest.id);
  };

  // tore the results of the first execution of the metrics
  // and use them as the initial state of the metrics.
  // This way, when they change the dates
  // we don't see the metrics disappear
  useEffect(() => {
    if (metrics && (!firstMetrics || firstMetrics?.all === 0)) {
      setFirstMetrics(metrics);
    }
  }, [metrics]);

  const isInitialState = !isLoadingMetrics && (!firstMetrics || firstMetrics?.all === 0);
  return (
    <div className="font-inter bg-mainGrey text-defaultText h-full">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center mb-8 md:mb-[68px]">
        <span className="md:pl-4 leading-8 font-medium text-[1.75rem]">Accounts Receivable</span>
        <LayoutGroup>
          {/* <LayoutWrapper className="pl-12 pt-16 font-medium text-base cursor-pointer">
              <PrimaryButton
                label="Settings"
                className="text-defaultText hover:bg-greyBg font-normal"
                onClick={() => {}}
              ></PrimaryButton>
            </LayoutWrapper> */}
          <AnimatePresence initial={false}>
            {!isInitialState && (
              <LayoutWrapper>
                <PrimaryButton
                  label="Create payment request"
                  className="text-white bg-primaryGreen hover:bg-primaryGreenHover w-full"
                  onClick={onCreatePaymentRequest}
                />
              </LayoutWrapper>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {!isInitialState && (
          <div className="mb-4">
            <FilterControlsRow
              setDateRange={setDateRange}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              currency={currencyFilter}
              setCurrency={setCurrencyFilter}
              minAmount={minAmountFilter}
              setMinAmount={setMinAmountFilter}
              maxAmount={maxAmountFilter}
              setMaxAmount={setMaxAmountFilter}
              tags={tags}
              setTags={setTags}
            />
          </div>
        )}
      </AnimatePresence>

      <LayoutGroup>
        <AnimatePresence initial={false}>
          {!isInitialState && (
            <LayoutWrapper className="h-full">
              <ScrollArea>
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
              </ScrollArea>
            </LayoutWrapper>
          )}
        </AnimatePresence>
        <LayoutWrapper className="bg-white min-h-[18rem] py-10 px-6 rounded-lg">
          {/* 
            TODO: Scroll Area will be used in the meantime until Pablo I design the table for mobile.
            Remove the ScrollArea when the mobile design is ready.
          */}
          <ScrollArea>
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
              onOpenPaymentPage={onOpenPaymentPage}
              selectedPaymentRequestID={selectedPaymentRequestID}
            />
          </ScrollArea>
        </LayoutWrapper>
      </LayoutGroup>

      <CreatePaymentRequestPage
        isOpen={isCreatePaymentRequestOpen}
        onClose={onCloseCreatePaymentRequest}
        token={token}
        merchantId={merchantId}
        apiUrl={apiUrl}
        onUnauthorized={onUnauthorized}
        onPaymentRequestCreated={onPaymentRequestCreated}
      />
      <PaymentRequestDetailsModal
        token={token}
        apiUrl={apiUrl}
        merchantId={merchantId}
        selectedPaymentRequestID={selectedPaymentRequestID ?? ''}
        merchantTags={localMerchantTags}
        paymentRequests={localPaymentRequests}
        open={selectedPaymentRequestID !== undefined}
        onDismiss={onPaymentRequestDetailsModalDismiss}
        setMerchantTags={setLocalMerchantTags}
        setPaymentRequests={setLocalPaymentRequests}
        onUnauthorized={onUnauthorized}
      ></PaymentRequestDetailsModal>
    </div>
  );
};

export default PaymentRequestDashboard;
