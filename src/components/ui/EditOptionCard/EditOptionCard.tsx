import { parseBoldText } from '../../../utils/uiFormaters';

interface EditOptionCardProps {
  label: string;
  value: string;
  details?: string[];
  onClick?: () => void;
}

const EditOptionCard = ({ label, value, details, onClick }: EditOptionCardProps) => {
  return (
    <button className="bg-mainGrey rounded-lg p-4 w-full flex flex-col text-sm/6" onClick={onClick}>
      <div className="flex w-full">
        <span className="text-greyText">{label}</span>

        <div className="ml-auto flex justify-center items-center">
          <span className="mr-4">{value}</span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-controlGrey hover:stroke-controlGreyHover transition"
          >
            <g clipPath="url(#clip0_1821_11481)">
              <path
                d="M14.7933 1.2066C14.5663 0.980492 14.2967 0.801613 14.0001 0.6803C13.7036 0.558986 13.3859 0.497642 13.0655 0.499811C12.7451 0.501981 12.4282 0.567621 12.1333 0.69294C11.8384 0.818259 11.5713 1.00077 11.3473 1.22993L1.68067 10.8966L0.5 15.4999L5.10333 14.3193L14.77 4.6526C14.9992 4.42864 15.1817 4.1615 15.307 3.8666C15.4323 3.57169 15.498 3.25488 15.5001 2.93447C15.5023 2.61405 15.4409 2.29638 15.3196 1.9998C15.1983 1.70323 15.0194 1.43364 14.7933 1.2066Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M11.0706 1.50659L14.4932 4.92926" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.67456 2.90259L13.0972 6.32525" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.68066 10.8967L5.10666 14.3161" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_1821_11481">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {details && details.length > 0 && (
        <div className="ml-auto mr-8 flex flex-col mt-2 text-end text-greyText">
          {details?.map((detail, index) => {
            return <span key={`detail-${index}`}>{parseBoldText(detail)}</span>;
          })}
        </div>
      )}
    </button>
  );
};

export default EditOptionCard;
