interface PrimaryButtonProps {
  label: string;
  className: string;
  onClick?: () => void;
}

const PrimaryButton = ({ label, className, onClick }: PrimaryButtonProps) => {
  return (
    <button
      className={`px-3 md:px-6 py-3 rounded-full text-base whitespace-nowrap inline-block align-middle cursor-pointer transition ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
