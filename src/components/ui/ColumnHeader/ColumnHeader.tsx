import { useEffect, useState } from 'react';
import classNames from 'classnames';

export enum SortDirection {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC',
}

interface ColumnHeaderProps {
  label: string;
  onSort: (event: SortDirection) => void;
}

const ColumnHeader = ({ label, onSort }: ColumnHeaderProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.NONE);

  useEffect(() => {
    onSort(sortDirection);
  }, [sortDirection]);

  const doSort = () => {
    if (sortDirection === SortDirection.NONE) {
      setSortDirection(SortDirection.DESC);
    } else if (sortDirection === SortDirection.DESC) {
      setSortDirection(SortDirection.ASC);
    } else {
      setSortDirection(SortDirection.NONE);
    }
  };

  return (
    <div className="columnSort group" onClick={doSort}>
      <span className="select-none uppercase">{label}</span>

      <div className="ml-2.5 space-y-1">
        <svg
          className={classNames('group-hover:block', {
            'stroke-controlGreyHover': sortDirection === SortDirection.ASC,
            'stroke-controlGrey': sortDirection === SortDirection.NONE || sortDirection === SortDirection.DESC,
            hidden: sortDirection === SortDirection.NONE,
          })}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 5L5 1L9 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          className={classNames('group-hover:block', {
            'stroke-controlGreyHover': sortDirection === SortDirection.DESC,
            'stroke-controlGrey': sortDirection === SortDirection.NONE || sortDirection === SortDirection.ASC,
            hidden: sortDirection === SortDirection.NONE,
          })}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 1L5 5L1 1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default ColumnHeader;
