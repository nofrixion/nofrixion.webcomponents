import { useState } from 'react';
import { LocalTag } from '../../../../types/LocalTypes';
import AddTag from '../AddTag/AddTag';
import Tag from '../Tag/Tag';
import { AnimatePresence } from 'framer-motion';

interface TagManagerProps {
  tags: LocalTag[];
  availableTags: LocalTag[];
  onDelete: (id: string) => void;
  onAdded: (tag: LocalTag) => void;
}

const TagManager = ({ tags, availableTags, onDelete, onAdded }: TagManagerProps) => {
  const [tagsArray, setTagsArray] = useState(tags);

  const handleDelete = (id: string) => {
    setTagsArray(tagsArray.filter((item) => item.ID !== id));

    onDelete(id);
  };

  const handleTagAdded = (tag: LocalTag) => {
    var index = tagsArray.findIndex((item) => item.name === tag.name);

    if (index !== -1) {
      tag.disabled = true;
    }

    setTagsArray([...tagsArray, tag]);

    if (index === -1) {
      onAdded(tag);
    }
  };

  return (
    <div className="flex flex-wrap w-auto gap-x-2 gap-y-2">
      <AnimatePresence>
        {tagsArray.map((tag) => (
          <Tag key={tag.name} id={tag.ID} label={tag.name} onDelete={handleDelete} />
        ))}
        <AddTag key="addtag" availableTags={availableTags} onTagAdded={handleTagAdded} />
      </AnimatePresence>
    </div>
  );
};

export default TagManager;
