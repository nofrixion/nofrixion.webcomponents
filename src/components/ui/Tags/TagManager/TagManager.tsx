import { useState } from 'react';
import { LocalTag } from '../../../../api/types/LocalTypes';
import AddTag from '../AddTag/AddTag';
import Tag from '../Tag/Tag';

interface TagManagerProps {
  tags: LocalTag[];
  onDelete: (id: string) => void;
  onAdded: (tag: LocalTag) => void;
}

const TagManager = ({ tags, onDelete, onAdded }: TagManagerProps) => {
  const [tagsArray, setTagsArray] = useState(tags);

  const handleDelete = (id: string) => {
    setTagsArray(tagsArray.filter((item) => item.ID !== id));

    onDelete(id);
  };

  const handleTagAdded = (tag: LocalTag) => {
    var index = tagsArray.findIndex((item) => item.name === tag.name);

    if (index === -1) {
      setTagsArray([...tagsArray, tag]);

      onAdded(tag);
    }
  };

  return (
    <div className="flex flex-wrap w-auto gap-x-2 gap-y-2">
      {tagsArray.map((tag) => (
        <Tag key={tag.name} id={tag.ID} label={tag.name} onDelete={handleDelete} />
      ))}
      <AddTag tags={tags} onTagAdded={handleTagAdded} />
    </div>
  );
};

export default TagManager;
