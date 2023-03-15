const Contact = ({ name, email }: LocalContact) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm">{name}</span>
      <span className="text-greyText text-xs mt-1">{email}</span>
    </div>
  );
};

export default Contact;
