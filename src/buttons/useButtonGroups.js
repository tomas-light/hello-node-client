import { useEffect, useState } from 'react';

function useButtonGroups(
  originalGroups,
  additionalGroups,
  hide
) {
  const [buttonGroups, setButtonGroups] = useState([]);

  useEffect(() => {
    let groups = joinGroups(originalGroups, additionalGroups);
    if (Array.isArray(hide)) {
      groups = filterButtonGroups(groups, hide);
    }
    setButtonGroups(groups);
  }, [
    originalGroups,
    additionalGroups,
    // hide,
  ]);

  return buttonGroups;
}

function joinGroups(originalGroups, additionalGroups) {
  if (!additionalGroups) {
    return originalGroups;
  }

  let maxLength = originalGroups.length;
  if (additionalGroups.length > maxLength) {
    maxLength = additionalGroups.length;
  }

  const joinedGroups = [];
  for (let i = 0; i < maxLength; i++) {
    const leftGroup = getGroupByIndex(originalGroups, i);
    const rightGroup = getGroupByIndex(additionalGroups, i);

    joinedGroups.push(leftGroup.concat(rightGroup));
  }

  return joinedGroups;
}

function getGroupByIndex(groups, index) {
  if (index >= groups.length) {
    return [];
  }
  return groups[index];
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
