import Pager from '../Pager/Pager';

interface TableProps {
  name: string;
  description: string;
}

const Table = ({ name, description }: TableProps) => {
  const onPageChange = (e: CustomEvent<number>) => {
    console.log(e.detail);
  };

  return (
    <>
      <div className="h-full w-full overflow-hidden justify-items-end">
        <Pager pageSize={20} totalRecords={1000} onPageChange={onPageChange}></Pager>
      </div>
    </>
  );
};

Table.componentProps = {
  name: String,
  description: String,
};

export default Table;
