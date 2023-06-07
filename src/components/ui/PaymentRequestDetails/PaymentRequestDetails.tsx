import Contact from '../Contact/Contact';
import { LocalPaymentRequest, LocalTag } from '../../../types/LocalTypes';
import QRCode from '../QRCode/QRCode';
import { CopyLink } from '../CopyLink/CopyLink';
import AmountPaid from '../AmountPaid/AmountPaid';
import { Currency } from '../../../api/types/Enums';
import StatusBadge from '../PaymentRequestStatusBadge/PaymentRequestStatusBadge';
import DetailsTabs from '../DetailsTabs/DetailsTabs';
import TagManager from '../Tags/TagManager/TagManager';

const PaymentRequestDetails = ({
  paymentRequest,
  merchantTags,
  hostedPaymentLink,
  onRefundClick,
  onTagAdded,
  onTagDeleted,
  onTagCreated,
}: {
  paymentRequest: LocalPaymentRequest;
  merchantTags: LocalTag[];
  hostedPaymentLink: string;
  onRefundClick: (paymentAttemptID: string) => void;
  onTagAdded: (tag: LocalTag) => void;
  onTagDeleted: (id: string) => void;
  onTagCreated: (tag: LocalTag) => void;
}) => {
  return (
    <>
      <div className="bg-[#F6F9F9] pl-8 pr-7 relative mb-[4.875rem]">
        <div className="flex justify-between pb-[2.625rem] pt-6 items-center">
          <Contact name={paymentRequest.contact.name} email={paymentRequest.contact.email} size="large"></Contact>
          <QRCode url={hostedPaymentLink}></QRCode>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-100 w-[92%]">
          <CopyLink link={hostedPaymentLink}></CopyLink>
        </div>
      </div>
      <div className="px-8">
        <div className="flex justify-between mb-10">
          <div className="w-1/3">
            <AmountPaid
              amountPaid={paymentRequest.paymentAttempts.reduce((acc, curr) => acc + curr.amount, 0)}
              totalAmount={paymentRequest.amount}
              currency={paymentRequest.currency === Currency.EUR ? Currency.EUR : Currency.GBP}
              partialPaymentMethod={paymentRequest.partialPaymentMethod}
            ></AmountPaid>
          </div>
          <div>
            <StatusBadge status={paymentRequest.status} size="large"></StatusBadge>
          </div>
        </div>
        <div className="mb-[2.625rem]">
          {paymentRequest.productOrService && paymentRequest.description && (
            <div className="flex flex-col gap-4 mb-8">
              {paymentRequest.productOrService && (
                <span className="text-base leading-[1.188rem] font-medium">{paymentRequest.productOrService}</span>
              )}
              {paymentRequest.description && (
                <span className="text-sm leading-[1.313rem] font-normal text-greyText">
                  {paymentRequest.description}
                </span>
              )}
            </div>
          )}
          <div>
            <TagManager
              availableTags={merchantTags}
              tags={paymentRequest.tags}
              onAdded={onTagAdded}
              onDeleted={onTagDeleted}
              onCreated={onTagCreated}
            ></TagManager>
          </div>
        </div>
        <div className="mb-6">
          <DetailsTabs paymentRequest={paymentRequest} onRefundClick={onRefundClick}></DetailsTabs>
        </div>
      </div>
    </>
  );
};

export default PaymentRequestDetails;
