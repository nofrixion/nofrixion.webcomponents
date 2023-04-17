import EditIcon from '../../../assets/icons/edit-icon.svg';

interface EditOptionCardProps {
  label: string;
  value: string;
  onClick?: () => void;
}

const EditOptionCard = ({ label, value, onClick }: EditOptionCardProps) => {
  return (
    <button className="bg-mainGrey rounded-lg p-4 flex w-full text-sm/6" onClick={onClick}>
      <span className="text-greyText">{label}</span>

      <div className="ml-auto flex justify-center items-center">
        <span className="mr-4">{value}</span>
        <img src={EditIcon} alt="Edit" />
      </div>
    </button>
  );
};

export default EditOptionCard;
