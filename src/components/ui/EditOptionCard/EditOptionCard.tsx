import { parseBoldText } from '../../../utils/uiFormaters';

import EditIcon from '../../../assets/icons/edit-icon.svg';
import classNames from 'classnames';

interface EditOptionCardProps {
  label: string;
  value?: string;
  details?: string[];
  onClick?: () => void;
  children?: React.ReactNode;
  isLoading: boolean;
}

const EditOptionCard = ({ label, value, details, onClick, children, isLoading }: EditOptionCardProps) => {
  const handleOnClick = () => {
    if (!isLoading) {
      onClick && onClick();
    }
  };
  return (
    <button
      className={classNames('bg-mainGrey group rounded-lg p-4 w-full flex flex-col text-sm/6 transition ease-in-out', {
        'hover:bg-greyBg': !isLoading,
        'cursor-default': isLoading,
      })}
      onClick={handleOnClick}
    >
      <div className="flex w-full">
        <span className="text-greyText">{label}</span>
        <img
          src={EditIcon}
          alt="Edit icon"
          className={classNames('ml-2 transition opacity-0', {
            'group-hover:opacity-100': !isLoading,
          })}
        />

        {isLoading && (
          <div className="animate-pulse my-auto ml-auto flex justify-center items-center">
            <div className="h-3 w-40 bg-[#E0E9EB] rounded-lg"></div>
          </div>
        )}
        {!isLoading && (
          <div className="ml-auto flex justify-center items-center transition">
            {value && <span>{value}</span>}
            {children}
          </div>
        )}
      </div>
      {!isLoading && details && details.length > 0 && (
        <div className="ml-auto flex flex-col mt-2 text-end text-greyText text-xs">
          {details?.map((detail, index) => {
            return <span key={`detail-${index}`}>{parseBoldText(detail)}</span>;
          })}
        </div>
      )}
    </button>
  );
};

export default EditOptionCard;
