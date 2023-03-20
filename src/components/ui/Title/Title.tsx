interface TitleProps {
  label: string;
}

/**
 * Primary UI component for user interaction
 */
const Title = ({ label }: TitleProps) => {
  return <h1>{label}</h1>;
};

Title.componentProps = {
  label: String,
};

export default Title;
