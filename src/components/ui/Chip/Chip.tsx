interface ChipProps {
  label: string;
}

const Chip = ({ label }: ChipProps) => {
  return <span className="text-[#1B2232] bg-[#EDF2F7] px-3 py-1 rounded-full text-xs whitespace-nowrap">{label}</span>;
};

Chip.componentProps = {
  label: String,
};

export default Chip;
