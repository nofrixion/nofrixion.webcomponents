import Contact from '../Contact/Contact';
import { LocalPaymentRequest } from '../../../types/LocalTypes';
import QRCode from '../QRCode/QRCode';
import { CopyLink } from '../CopyLink/CopyLink';
import AmountPaid from '../AmountPaid/AmountPaid';
import { Currency } from '../../../api/types/Enums';
import StatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge';
import AddTag from '../AddTag/AddTag';
import { Tag } from '../../../api/types/ApiResponses';
import DetailsTabs from '../DetailsTabs/DetailsTabs';

const PaymentRequestDetails = ({
  paymentRequest,
  onRefundClick,
  onTagAdded,
}: {
  paymentRequest: LocalPaymentRequest;
  onRefundClick: (paymentAttemptID: string) => void;
  onTagAdded: (tag: Tag) => void;
}) => {
  return (
    <>
      <div className="bg-[#F6F9F9] pl-8 pr-7 relative mb-[4.875rem]">
        <div className="flex justify-between pb-[2.625rem] pt-6 items-center">
          <Contact name={paymentRequest.contact.name} email={paymentRequest.contact.email} size="large"></Contact>
          <QRCode url={paymentRequest.hostedPayCheckoutUrl}></QRCode>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 z-10 w-[92%]">
          <CopyLink link={paymentRequest.hostedPayCheckoutUrl}></CopyLink>
        </div>
      </div>
      <div className="px-8">
        <div className="flex justify-between mb-10">
          <div className="w-1/3">
            <AmountPaid
              amountPaid={paymentRequest.paymentAttempts.reduce((acc, curr) => acc + curr.amount, 0)}
              totalAmount={paymentRequest.amount}
              currency={paymentRequest.currency === Currency.EUR ? Currency.EUR : Currency.GBP}
            ></AmountPaid>
          </div>
          <div>
            <StatusBadge status={paymentRequest.status} size="large"></StatusBadge>
          </div>
        </div>
        <div className="mb-[2.625rem]">
          <div className="flex flex-col gap-4 mb-8">
            <span className="text-base leading-[1.188rem] font-medium">{paymentRequest.productOrService}</span>
            <span className="text-sm leading-[1.313rem] font-normal text-greyText">{paymentRequest.description}</span>
          </div>
          {/* Replace with tag management component when it's ready */}
          <AddTag tags={paymentRequest.tags} onTagAdded={onTagAdded}></AddTag>
        </div>
        <div>
          <DetailsTabs paymentRequest={paymentRequest} onRefundClick={onRefundClick}></DetailsTabs>
        </div>
      </div>
    </>
  );
};

export default PaymentRequestDetails;
