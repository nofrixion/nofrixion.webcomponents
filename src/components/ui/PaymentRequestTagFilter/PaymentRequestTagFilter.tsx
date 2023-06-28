import FilterButton from '../FilterButton/FilterButton';
import React, { useEffect } from 'react';
import disabledTagIcon from '../../../assets/icons/tag-icon-disabled.svg';
import enabledTagIcon from '../../../assets/icons/tag-icon-enabled.svg';
import filterIcon from '../../../assets/icons/filter-icon.svg';
import SelectablePill from '../SelectablePill/SelectablePill';

export interface TagFilter {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface PaymentRequestTagFilterProps {
  tags: TagFilter[];
  setTags: (tags: TagFilter[]) => void;
}

const PaymentRequestTagFilter: React.FC<PaymentRequestTagFilterProps> = ({ tags, setTags }) => {
  const [localTags, setLocalTags] = React.useState<TagFilter[]>(tags);
  const [isFiltered, setIsFiltered] = React.useState<boolean>(false);

  useEffect(() => {
    setLocalTags([...tags]);
    checkIfIsFiltered();
  }, [tags]);

  const onReset = () => {
    let tempArray = [...localTags];
    tempArray.forEach((tag) => (tag.isSelected = false));
    setLocalTags([...tempArray]);
    setTags([...tempArray]);
  };

  const onApply = () => {
    setTags([...localTags]);
    let isFiltered = false;
    localTags.forEach((tag) => {
      if (tag.isSelected) {
        isFiltered = true;
      }
    });
    setIsFiltered(isFiltered);
  };

  const checkIfIsFiltered = () => {
    let isFiltered = false;
    tags.forEach((tag) => {
      if (tag.isSelected) {
        isFiltered = true;
      }
    });
    setIsFiltered(isFiltered);
  };

  const getSelectedTagsLegend = () => {
    let selectedTagsCount = 0;
    tags.forEach((tag) => {
      if (tag.isSelected) {
        selectedTagsCount++;
      }
    });

    if (selectedTagsCount === 1) {
      return `1 tag applied`;
    } else {
      return `${selectedTagsCount} tags applied`;
    }
  };

  return (
    <FilterButton
      label="Tags"
      isFiltered={isFiltered}
      defaultIconSource={disabledTagIcon}
      highlightedIconSource={enabledTagIcon}
      onReset={onReset}
      onApply={onApply}
    >
      <FilterButton.Body>
        <div className="flex space-x-2 flex-wrap gap-y-3.5 justify-center">
          {localTags.map((tag, index) => (
            <SelectablePill
              key={index}
              label={tag.label}
              selected={tag.isSelected}
              onSelect={(selected) => {
                let tempArray = [...localTags];
                tempArray[index].isSelected = selected;
                setLocalTags([...tempArray]);
              }}
            />
          ))}
        </div>
      </FilterButton.Body>
      <FilterButton.FilteredLayout>
        <img src={enabledTagIcon} alt={getSelectedTagsLegend()} className="w-4 h-4" title={getSelectedTagsLegend()} />
        <span className="text-sm">{getSelectedTagsLegend()}</span>
      </FilterButton.FilteredLayout>
    </FilterButton>
  );
};

export default PaymentRequestTagFilter;
