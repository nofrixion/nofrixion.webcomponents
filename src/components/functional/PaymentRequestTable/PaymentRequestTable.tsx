import { useState } from 'react';
import { usePaymentRequests } from '../../../api/hooks/usePaymentRequests';
import { useDeletePaymentRequest } from '../../../api/hooks/useDeletePaymentRequest';
import UIPaymentRequestTable from '../../ui/PaymentRequestTable/PaymentRequestTable';
import { RemotePaymentRequestToLocalPaymentRequest } from '../../../utils/parsers';
import { SortDirection } from '../../ui/ColumnHeader/ColumnHeader';
import { LocalPaymentRequest } from '../../../api/types/LocalTypes';
import { Toaster, makeToast } from '../../ui/Toast/Toast';
import CustomDialog from '../../ui/Dialog/Dialog';

interface PaymentRequestTableProps {
  token: string; // Example: "eyJhbGciOiJIUz..."
  apiUrl?: string; // Example: "https://api.nofrixion.com/api/v1"
}

const PaymentRequestTable = ({ token, apiUrl = 'https://api.nofrixion.com/api/v1' }: PaymentRequestTableProps) => {
  const [page, setPage] = useState(1);
  const [statusSortDirection, setStatusSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [createdSortDirection, setCreatedSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [contactSortDirection, setContactSortDirection] = useState<SortDirection>(SortDirection.NONE);
  const [amountSortDirection, setAmountSortDirection] = useState<SortDirection>(SortDirection.NONE);

  /* Deletion confirmation dialog */
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [paymentRequestIdToDelete, setPaymentRequestIdToDelete] = useState('');

  const pageSize = 10;

  const { paymentRequests, totalRecords, fetchPaymentRequests } = usePaymentRequests(
    apiUrl,
    token,
    statusSortDirection,
    createdSortDirection,
    contactSortDirection,
    amountSortDirection,
    page,
    pageSize,
  );

  const { deletePaymentRequest } = useDeletePaymentRequest(apiUrl, token);

  const localPaymentRequests: LocalPaymentRequest[] = paymentRequests.map((paymentRequest) =>
    RemotePaymentRequestToLocalPaymentRequest(paymentRequest),
  );

  const onDeletePaymentRequest = async (paymentRequest: LocalPaymentRequest) => {
    setPaymentRequestIdToDelete(paymentRequest.id);
    setIsDeleteDialogOpen(true);
  };

  const onCopyPaymentRequestLink = async (paymentRequest: LocalPaymentRequest) => {
    let link = `${apiUrl}/nextgen/pay/${paymentRequest.id}`;
    await navigator.clipboard.writeText(link);

    makeToast('success', 'Payment request link copied to clipboard.');
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeletePaymentRequest = async () => {
    if (paymentRequestIdToDelete && paymentRequestIdToDelete !== '') {
      let deleteError = await deletePaymentRequest(paymentRequestIdToDelete);

      if (deleteError) {
        makeToast('error', deleteError.title);
        return;
      }

      makeToast('success', 'Payment request successfully deleted.');

      await fetchPaymentRequests();
      setPaymentRequestIdToDelete('');
    }

    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <UIPaymentRequestTable
        paymentRequests={localPaymentRequests}
        pageSize={pageSize}
        totalRecords={totalRecords}
        onPageChanged={setPage}
        setStatusSortDirection={setStatusSortDirection}
        setCreatedSortDirection={setCreatedSortDirection}
        setContactSortDirection={setContactSortDirection}
        setAmountSortDirection={setAmountSortDirection}
        onPaymentRequestDeleteClicked={onDeletePaymentRequest}
        onPaymentRequestCopyLinkClicked={onCopyPaymentRequestLink}
      />
      <Toaster positionY="bottom" positionX="right" duration={5000} />
      <CustomDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        title="Confirm payment request deletion."
        message="Are you sure you want to delete this payment request?"
        okButtonText="Delete"
        cancelButtonText="Cancel"
        okButtonOnClick={confirmDeletePaymentRequest}
        cancelButtonOnClick={closeDeleteDialog}
      />
    </>
  );
};

PaymentRequestTable.componentProps = {
  token: String,
  apiUrl: String,
};

export default PaymentRequestTable;
