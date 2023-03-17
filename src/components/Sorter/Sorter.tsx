import { useEffect, useState } from 'react';
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

  useEffect(() => {
    onSort({
      name: name,
      direction: sortDirection,
    });
  }, [sortDirection]);

  const doSort = () => {
    if (sortDirection === SortDirection.NONE) {
      setSortDirection(SortDirection.ASC);
    } else if (sortDirection === SortDirection.ASC) {
      setSortDirection(SortDirection.DESC);
    } else {
      setSortDirection(SortDirection.NONE);
    }
  };

  return (
    <>
      <div
        className="h-3 grid grid-flow-col-dense w-8 mt-1 ml-1 text-sm text-greyText cursor-pointer hover:text-controlGreyHover"
        onClick={doSort}
      >
        <div>{name.toUpperCase()}</div>

        <div className="mt-1 ml-2.5">
          <svg
            className={classNames('hover:stroke-controlGreyHover', {
              'stroke-controlGreyHover': sortDirection === SortDirection.ASC,
              'stroke-controlGrey': sortDirection === SortDirection.NONE || sortDirection === SortDirection.DESC,
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
            className={classNames('hover:stroke-controlGreyHover', {
              'stroke-controlGreyHover': sortDirection === SortDirection.DESC,
              'stroke-controlGrey': sortDirection === SortDirection.NONE || sortDirection === SortDirection.ASC,
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
    </>
  );
};

export default Sorter;
