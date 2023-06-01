import React from 'react';

const parseHighlightedText = (text: string) => {
  const boldRegex = /\*(.*?)\*/g;
  const parts = text.split(boldRegex); // split description into an array of strings and bold text

  return parts.map((part, index) => {
    if (index % 2) {
      // if part is bold text, wrap it in a span element with the font-bold class
      return (
        <span key={index} className="text-defaultText">
          {part}
        </span>
      );
    } else {
      // otherwise, return the regular text
      return <React.Fragment key={index}>{part}</React.Fragment>;
    }
  });
};

const formatEmailAddressesForSummary = (emailAddresses: string) => {
  return formatSentenceFromList(
    emailAddresses
      ?.split(',')
      .map((email) => {
        return `*${email.trim()}*`;
      })
      .join(', ')
      .split(','),
  );
};

const formatSentenceFromList = (list: string[]) => {
  if (list.length === 1) {
    return parseHighlightedText(list[0]);
  }

  if (list.length === 2) {
    return parseHighlightedText(`${list[0]} and ${list[1]}`);
  }

  const lastItem = list.pop();

  return parseHighlightedText(`${list.join(', ')}, and ${lastItem}`);
};

export { parseHighlightedText as parseBoldText, formatEmailAddressesForSummary, formatSentenceFromList };
