import { LocalPaymentRequest } from '../../../types/LocalTypes';
import { formatAmount, formatDate } from '../../../utils/formatters';
import PaymentRequestActionMenu from '../PaymentRequestActionMenu/PaymentRequestActionMenu';
import { defaultAnonymousUserName } from '../../../utils/constants';
import PaymentRequestStatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge';

interface PaymentRequestMobileCardProps extends LocalPaymentRequest {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDuplicate?: () => void;
  onCopyLink?: () => void;
  onDelete?: () => void;
  onOpenPaymentPage?: () => void;
}

const PaymentRequestMobileCard = ({
  status,
  createdAt,
  contact,
  amount,
  currency,
  onClick,
  onDuplicate,
  onCopyLink,
  onDelete,
  onOpenPaymentPage,
}: PaymentRequestMobileCardProps) => {
  const onDeletePaymentRequestClicked = async () => {
    const hasConfirmedToDelete = confirm(
      "Are you sure you want to delete this payment request? This action can't be undone.",
    );

    if (!hasConfirmedToDelete) {
      return;
    }

    onDelete && onDelete();
  };

  return (
    <div className="bg-white p-4 pr-2 rounded-lg tabular-nums w-full cursor-pointer" onClick={onClick}>
      {/* Date, ammount & context menu */}
      <div className="flex mb-4 text-left">
        <span className="text-xs/6 w-20 mr-2">{formatDate(createdAt)}</span>
        <span className="ml-auto text-xl/6 font-medium mr-2 truncate">{formatAmount(amount)}</span>
        <span className="text-sm/6 text-greyText uppercase mr-2">{currency}</span>
        <PaymentRequestActionMenu
          onDuplicate={onDuplicate}
          onDelete={onDeletePaymentRequestClicked}
          onCopyLink={onCopyLink}
          onOpenPaymentPage={onOpenPaymentPage}
        />
        {/* TODO: Add context menu */}
      </div>
      <div className="flex">
        <div className="flex flex-col text-left overflow-hidden">
          <span className="text-xs truncate">{contact.name ?? defaultAnonymousUserName}</span>
          <span className="text-xs text-greyText truncate break-all">{contact.email}</span>
        </div>
        <div className="flex justify-end ml-auto mr-7 w-24 h-6">
          <PaymentRequestStatusBadge status={status} size="small"></PaymentRequestStatusBadge>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestMobileCard;
