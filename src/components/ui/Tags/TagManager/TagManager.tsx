import { useState } from 'react';
import { LocalTag } from '../../../../api/types/LocalTypes';
import AddTag from '../AddTag/AddTag';
import Tag from '../Tag/Tag';

interface TagManagerProps {
  tags: LocalTag[];
  onDelete?: (id: string) => void;
  onAdded?: (id: string) => void;
}

const TagManager = ({ tags, onDelete, onAdded }: TagManagerProps) => {
  const [tagsArray, setTagsArray] = useState(tags);

  const handleDelete = (id: string) => {
    setTagsArray(tagsArray.filter((item) => item.ID !== id));

    onDelete && onDelete(id);
  };

  const handleTagAdded = (tag: LocalTag) => {
    var index = tagsArray.findIndex((item) => item.name === tag.name);

    if (index === -1) {
      setTagsArray([...tagsArray, tag]);

      // TODO: Call API to add tag?

      onAdded && onAdded(tag.ID);
    }
  };

  return (
    <div className="flex flex-wrap flex-row space-x-1">
      {tagsArray.map((tag) => (
        <Tag key={tag.name} id={tag.ID} label={tag.name} onDelete={handleDelete} />
      ))}
      <AddTag tags={tags} onTagAdded={handleTagAdded} />
    </div>
  );
};

export default TagManager;
