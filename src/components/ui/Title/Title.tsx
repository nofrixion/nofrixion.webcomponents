interface TitleProps {
  label: string;
}

/**
 * Primary UI component for user interaction
 */
const Title = ({ label }: TitleProps) => {
  return <h1 className="font-inter">{label}</h1>;
};

Title.componentProps = {
  label: String,
};

export default Title;
