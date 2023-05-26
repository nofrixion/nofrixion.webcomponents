import emptyStateIllustration from '../../../assets/images/empty-state.svg';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

interface EmptyStateProps {
  state: 'nothingFound' | 'empty';
  onCreatePaymentRequest?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ state, onCreatePaymentRequest }) => {
  const title = state === 'nothingFound' ? 'Nothing found here' : 'This list is empty';
  const description =
    state === 'nothingFound'
      ? 'No payment requests match this criteria.'
      : 'Start requesting payments from your customers.';

  return (
    <div className="flex flex-col items-center justify-center text-center my-16">
      <div className="w-auto h-[9.375rem] mx-auto mb-6">
        <img className="object-cover" src={emptyStateIllustration} alt="Emtpy static illustration" />
      </div>
      <p className="text-xl/6 mb-2 font-semibold">{title}</p>
      <p className="text-sm/4 text-greyText">{description}</p>

      {state === 'empty' && onCreatePaymentRequest && (
        <PrimaryButton
          label="Create payment request"
          className="mt-[2.625rem] text-white bg-primaryGreen hover:bg-primaryGreenHover"
          onClick={onCreatePaymentRequest}
        />
      )}
    </div>
  );
};

export default EmptyState;