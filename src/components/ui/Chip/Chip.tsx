interface ChipProps {
  label: string;
}

const Chip = ({ label }: ChipProps) => {
  return (
    <span className="text-[#1B2232] bg-greyBg px-3 py-1 rounded-full text-xs whitespace-nowrap inline-block align-middle">
      {label}
    </span>
  );
};

Chip.componentProps = {
  label: String,
};

export default Chip;
