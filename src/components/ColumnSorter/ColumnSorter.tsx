import { useEffect, useState } from 'react';
import classNames from 'classnames';

export enum SortDirection {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SortEvent {
  name: string;
  direction: SortDirection;
}

interface ColumnSorterProps {
  name: string;
  onSort: (event: SortEvent) => void;
}

const ColumnSorter = ({ name, onSort }: ColumnSorterProps) => {
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
        className="grid grid-rows-1 justify-items-end h-3 w-3 mt-1 ml-1 text-sm text-greyText cursor-pointer hover:text-[#454D54]"
        onClick={handleSort}
      >
        {name.toUpperCase()}

        {/* {sortDirection === SortDirection.DESC && <span className="arrow">&#8595;</span>} */}
        <div className="grid grid-cols-1 ml-10 mt-0">
          <span className="arrow">&#8593;</span>
          <span className="arrow">&#8595;</span>
        </div>
      </div>
    </>
  );
};

export default ColumnSorter;
