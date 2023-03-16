import { useState } from 'react';
import classNames from 'classnames';

export enum SortDirection {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortEvent {
  name: string;
  direction: SortDirection;
}

interface SorterProps {
  name: string;
  onSort: (event: SortEvent) => void;
}

const Sorter = ({ name, onSort }: SorterProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.NONE);

  const handleSort = () => {
    if (sortDirection === SortDirection.NONE) {
      setSortDirection(SortDirection.ASC);
      onSort({
        name: name,
        direction: SortDirection.ASC,
      });
    } else if (sortDirection === SortDirection.ASC) {
      setSortDirection(SortDirection.DESC);
      onSort({
        name: name,
        direction: SortDirection.DESC,
      });
    } else {
      setSortDirection(SortDirection.NONE);
      onSort({
        name: name,
        direction: SortDirection.NONE,
      });
    }
  };

  return (
    <>
      <div
        className="h-3 grid grid-flow-col-dense w-8 mt-1 ml-1 text-sm text-greyText cursor-pointer hover:text-[#454D54]"
        onClick={handleSort}
      >
        <div>{name.toUpperCase()}</div>

        <div className="mt-1 ml-2.5">
          <svg
            className={classNames('stroke-[#8F99A3]', {
              'hover:stroke-[#454D54]': sortDirection === SortDirection.ASC,
            })}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 5L5 1L9 5" stroke="#8F96A3" />
          </svg>
          <svg
            className={classNames('stroke-[#8F99A3]', {
              'hover:stroke-[#454D54]': sortDirection === SortDirection.DESC,
            })}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 1L5 5L1 1" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Sorter;
