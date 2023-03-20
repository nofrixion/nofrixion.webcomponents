import { useEffect, useState } from 'react';
import classNames from 'classnames';

interface PagerProps {
  pageSize: number;
  totalRecords: number;
  onPageChange: (pageNumber: number) => void;
}

const Pager = ({ pageSize, totalRecords, onPageChange }: PagerProps) => {
  const getToRecord = () => {
    if (pageSize > totalRecords) {
      return totalRecords;
    } else {
      return pageSize;
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [fromRecord, setFromRecord] = useState(1);
  const [toRecord, setToRecord] = useState(getToRecord());
  const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / pageSize));

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageSize));

    if (currentPage <= 1) {
      setFromRecord(1);
      setToRecord(getToRecord());
    } else if (currentPage < totalPages) {
      setFromRecord(pageSize * currentPage - pageSize + 1);
      setToRecord(pageSize * currentPage);
    } else {
      setFromRecord(pageSize * currentPage - pageSize + 1);
      setToRecord(totalRecords);
    }

    onPageChange(currentPage);
  }, [currentPage, pageSize]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageSize));

    if (totalRecords < toRecord) {
      // Reset to first page
      setCurrentPage(1);
    }
  }, [totalRecords]);

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

  const svgClassNames = (show: boolean) => {
    return classNames('h-3 w-3 mt-1 ml-1 stroke-controlGrey', {
      'cursor-pointer hover:stroke-controlGreyHover': show,
    });
  };

  return (
    <div className="flex space-x-1 text-[#73808C] text-sm justify-end whitespace-nowrap">
      <div>
        {fromRecord}-{toRecord}
      </div>
      <div>of</div>
      <div>{totalRecords}</div>
      <div>
        <svg
          className={svgClassNames(currentPage > 1)}
          width="7"
          height="13"
          viewBox="0 0 7 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => decrementPageNumber()}
        >
          <path d="M6.5 0.5L0.5 6.5L6.5 12.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <svg
          className={svgClassNames(currentPage < totalPages)}
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => incrementPageNumber()}
        >
          <path d="M1 12.5L7 6.5L0.999999 0.500001" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default Pager;
