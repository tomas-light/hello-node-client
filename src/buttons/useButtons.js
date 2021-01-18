import { useEffect, useState } from 'react';

function useButtons(
  originalButtons,
  areaName,
  hide,
  additionalButtons
) {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    let filteredButtons = originalButtons;
    if (areaName in hide) {
      filteredButtons = excludeItemsByIndexes(originalButtons, hide[areaName]);
    }

    const resultButtons = filteredButtons.concat(additionalButtons || []);
    setButtons(resultButtons);
  }, [originalButtons, areaName, hide, additionalButtons]);

  return buttons;
}

function excludeItemsByIndexes(items, indexes) {
  return items.reduce((array, item, index) => {
    if (!indexes.includes(index)) {
      array.push(item);
    }
    return array;
  }, []);
}

export { useButtons };
