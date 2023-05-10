import { parseBoldText } from '../../../utils/uiFormaters';

import EditIcon from '../../../assets/icons/edit-icon.svg';

interface EditOptionCardProps {
  label: string;
  value?: string;
  details?: string[];
  onClick?: () => void;
  children?: React.ReactNode;
}

const EditOptionCard = ({ label, value, details, onClick, children }: EditOptionCardProps) => {
  return (
    <button
      className="bg-mainGrey group rounded-lg p-4 w-full flex flex-col text-sm/6 transition ease-in-out hover:bg-greyBg"
      onClick={onClick}
    >
      <div className="flex w-full">
        <span className="text-greyText">{label}</span>
        <img src={EditIcon} alt="Edit icon" className="ml-2 transition opacity-0 group-hover:opacity-100" />

        <div className="ml-auto flex justify-center items-center">
          {value && <span>{value}</span>}
          {children}
        </div>
      </div>

      {details && details.length > 0 && (
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
