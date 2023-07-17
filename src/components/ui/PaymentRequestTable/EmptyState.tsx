import emptyStateIllustration from '../../../assets/images/empty-state.svg';
import Button from '../Button/Button';

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
        <Button
          label="Create payment request"
          type="primary"
          size="big"
          onClick={onCreatePaymentRequest}
          className="mt-[2.625rem] w-64"
        />
      )}
    </div>
  );
};

export default EmptyState;
