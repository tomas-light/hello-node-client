import { useEffect, useState } from 'react';

function useButtonGroups(
  originalButtonsGroups,
  additionalButtonsGroups,
  hide
) {
  const [buttonGroups, setButtonGroups] = useState([]);

  useEffect(() => {
    let groups = originalButtonsGroups.concat(additionalButtonsGroups || []);
    if (Array.isArray(hide)) {
      groups = filterButtonGroups(groups, hide);
    }
    setButtonGroups(groups);
  }, [
    originalButtonsGroups,
    additionalButtonsGroups,
    // hide,
  ]);

  return buttonGroups;
}

function filterButtonGroups(groups, indexes) {
  const filteredGroups = [];

  let i = 0;
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    const group = groups[groupIndex];
    const filteredGroup = [];

    group.forEach(item => {
      if (!indexes.includes(i)) {
        filteredGroup.push(item);
      }
      i++;
    });

    filteredGroups.push(filteredGroup);
  }

  return filteredGroups;
}

export { useButtonGroups, filterButtonGroups };
