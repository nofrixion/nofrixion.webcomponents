import { LocalContact } from '../../../types/LocalTypes';

const Contact = ({ name, email }: LocalContact) => {
  return (
    <div className="flex flex-col">
      <span className="text-13px">{name}</span>
      <span className="text-greyText text-xs">{email}</span>
    </div>
  );
};

export default Contact;
