import { useEffect, useState } from 'react';
import pagePreviousIcon from '../../assets/images/page-previous.svg';
import pageNextIcon from '../../assets/images/page-next.svg';
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

  return (
    <div className="flex space-x-1 text-[#73808C] text-sm">
      <div>
        {fromRecord}-{toRecord}
      </div>
      <div>of</div>
      <div>{totalRecords}</div>
      <div className="ml-2">
        <img
          className={classNames('h-3 w-3 mt-1', {
            'cursor-pointer': currentPage > 1,
          })}
          src={pagePreviousIcon}
          alt={'Previous Page'}
          onClick={() => decrementPageNumber()}
        />
      </div>
      <div>
        <img
          className={classNames('h-3 w-3 mt-1', {
            'cursor-pointer': currentPage < totalPages,
          })}
          src={pageNextIcon}
          alt={'Next Page'}
          onClick={() => incrementPageNumber()}
        />
      </div>
    </div>
  );
};

export default Pager;
