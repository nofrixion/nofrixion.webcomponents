import ellipseGrey from '../../../assets/images/ellipse.grey.svg';
import ellipseGreen from '../../../assets/images/ellipse.green.svg';
import ellipseOrange from '../../../assets/images/ellipse.orange.svg';
import classNames from 'classnames';
import { PaymentRequestStatus } from '../../../api/types/Enums';

export interface TabProps {
  status: PaymentRequestStatus;
  totalRecords: number;
  selected: boolean;
  onSelect: () => void;
}

const getIconForStatus = (status: PaymentRequestStatus) => {
  switch (status) {
    case PaymentRequestStatus.PartiallyPaid:
      return ellipseOrange;
    case PaymentRequestStatus.FullyPaid:
      return ellipseGreen;
    case PaymentRequestStatus.None:
      return ellipseGrey;
    default:
      return;
  }
};

const getDisplayTextForStatus = (status: PaymentRequestStatus) => {
  switch (status) {
    case PaymentRequestStatus.PartiallyPaid:
      return 'Partially paid';
    case PaymentRequestStatus.FullyPaid:
      return 'Paid';
    case PaymentRequestStatus.None:
      return 'Unpaid';
    default:
      return 'All';
  }
};

const selectedClassNames = (classes: string, selected: boolean) => {
  return classNames(classes, {
    'text-defaultText': selected,
    'text-greyText group-hover:text-controlGreyHover cursor-pointer': !selected,
  });
};

const Tab = ({ status, totalRecords, selected, onSelect }: TabProps) => {
  return (
    <div
      className={classNames('flex justify-center whitespace-nowrap h-20 w-fit', {
        'bg-white border-t-2 border-[#00B2B2] pt-[14px]': selected,
        'pt-4': !selected,
      })}
    >
      <div className="flex flex-col items-center px-8 pb-3 group">
        <span className={selectedClassNames('text-[20px] leading-7 font-semibold', selected)}>{totalRecords}</span>
        <div className="flex items-center space-x-1">
          {getIconForStatus(status) && <img src={getIconForStatus(status)} alt="ellipse" className="pr-1" />}
          <span className={selectedClassNames('text-sm leading-6 font-normal', selected)}>
            {getDisplayTextForStatus(status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tab;
