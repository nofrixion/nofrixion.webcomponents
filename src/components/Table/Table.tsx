interface TableProps {
  name: string;
  description: string;
}

const Table = ({ name, description }: TableProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-blue-900 text-white">
      <span>{name}</span>
      <span>{description}</span>
    </div>
  );
};

Table.componentProps = {
  name: String,
  description: String,
};

export default Table;
