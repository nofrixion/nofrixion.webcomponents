import { useState } from 'react';
import { LocalTag } from '../../../../types/LocalTypes';
import AddTag from '../AddTag/AddTag';
import Tag from '../Tag/Tag';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

interface TagManagerProps {
  tags: LocalTag[];
  availableTags: LocalTag[];
  onDeleted: (id: string) => void;
  onAdded: (tag: LocalTag) => void;
  onCreated: (tag: LocalTag) => void;
}

const TagManager = ({ tags, availableTags, onDeleted, onAdded, onCreated }: TagManagerProps) => {
  const [tagsArray, setTagsArray] = useState(tags);

  const handleDelete = (id: string) => {
    setTagsArray(tagsArray.filter((item) => item.ID !== id));

    onDeleted(id);
  };

  const handleTagAdded = (tag: LocalTag) => {
    var index = tagsArray.findIndex((item) => item.name === tag.name);

    // Tag already exists in the local list?
    // Create a new one for display only and set it to disabled.
    if (index !== -1) {
      tag = { ...tag, ID: uuidv4(), enabled: false };
    }

    setTagsArray([...tagsArray, tag]);

    if (index === -1) {
      onAdded(tag);
    }
  };

  const handleTagCreated = (tag: LocalTag) => {
    setTagsArray([...tagsArray, tag]);

    onCreated(tag);
  };

  return (
    <div className="flex flex-wrap w-auto gap-x-2 gap-y-2">
      <AnimatePresence>
        {tagsArray.map((tag) => (
          <Tag key={tag.ID} id={tag.ID} label={tag.name} enabled={tag.enabled} onDelete={handleDelete} />
        ))}
        <AddTag
          key="addtag"
          availableTags={availableTags}
          onTagAdded={handleTagAdded}
          onTagCreated={handleTagCreated}
        />
      </AnimatePresence>
    </div>
  );
};

export default TagManager;
