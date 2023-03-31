interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
}

const PrimaryButton = ({ label, onClick }: PrimaryButtonProps) => {
  return (
    <span
      className="text-white bg-primaryGreen hover:bg-primaryGreenHover px-6 py-3 rounded-full text-base whitespace-nowrap inline-block align-middle cursor-pointer"
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default PrimaryButton;
