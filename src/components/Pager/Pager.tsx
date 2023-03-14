import { useEffect, useState } from 'react';

interface PagerProps {
  pageSize: number;
  totalRecords: number;
}

const Pager = ({ pageSize, totalRecords }: PagerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fromRecord, setFromRecord] = useState(1);
  const [toRecord, setToRecord] = useState(pageSize);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / pageSize));

  useEffect(() => {
    if (currentPage <= 1) {
      setFromRecord(1);
      setToRecord(pageSize);
    } else if (currentPage < totalPages) {
      setFromRecord(pageSize * currentPage - pageSize + 1);
      setToRecord(pageSize * currentPage);
    } else {
      setFromRecord(pageSize * currentPage - pageSize + 1);
      setToRecord(totalRecords);
    }
  }, [currentPage]);

  const decrementPageNumber = async () => {
    if (currentPage <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const incrementPageNumber = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex space-x-1 text-[#8F99A3] text-sm">
      <div>{fromRecord}</div>
      <div>-</div>
      <div>{toRecord}</div>
      <div>of {totalRecords}</div>
      <div>
        <button className="ml-2" onClick={() => decrementPageNumber()}>
          <p>{'<'}</p>
        </button>
      </div>
      <div>
        <button onClick={() => incrementPageNumber()}>
          <p>{'>'}</p>
        </button>
      </div>
    </div>
  );
};

Pager.componentProps = {
  pageSize: Number,
  totalRecords: Number,
};

export default Pager;
