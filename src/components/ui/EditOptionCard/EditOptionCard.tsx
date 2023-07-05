import { parseBoldText } from '../../../utils/uiFormaters';

import EditIcon from '../../../assets/icons/edit-icon.svg';
import classNames from 'classnames';

interface EditOptionCardProps {
  label: string;
  values?: string[];
  details?: string[];
  onClick?: () => void;
  children?: React.ReactNode;
  isLoading: boolean;
}

const EditOptionCard = ({ label, values, details, onClick, children, isLoading }: EditOptionCardProps) => {
  const handleOnClick = () => {
    if (!isLoading) {
      onClick && onClick();
    }
  };
  return (
    <button
      className={classNames(
        'bg-mainGrey group rounded-lg p-4 w-full flex flex-col text-sm/6 transition ease-in-out text-left',
        {
          'hover:bg-greyBg': !isLoading,
          'cursor-default': isLoading,
        },
      )}
      onClick={handleOnClick}
    >
      <div className="flex flex-col md:flex-row w-full">
        <span className="text-greyText mb-3.5 md:mb-0">{label}</span>

        <div className="hidden md:block">
          <img
            src={EditIcon}
            alt="Edit icon"
            className={classNames('ml-2 transition opacity-0 mt-1', {
              'group-hover:opacity-100': !isLoading,
            })}
          />
        </div>

        {isLoading && (
          <div className="animate-pulse my-auto ml-auto flex justify-center items-center">
            <div className="h-3 w-40 bg-[#E0E9EB] rounded-lg"></div>
          </div>
        )}
        {!isLoading && (
          <div className="flex-col grid md:justify-items-end md:ml-auto transition truncate">
            {values &&
              values.map((value, index) => {
                return (
                  <span className="truncate" key={`value-${index}`}>
                    {value}
                  </span>
                );
              })}
            {children}
          </div>
        )}
      </div>
      {!isLoading && details && details.length > 0 && (
        <div className="flex flex-col mt-2 text-greyText text-xs md:ml-auto">
          {details?.map((detail, index) => {
            return <span key={`detail-${index}`}>{parseBoldText(detail)}</span>;
          })}
        </div>
      )}
    </button>
  );
};

export default EditOptionCard;
