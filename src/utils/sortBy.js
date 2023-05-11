export const sortBy = (items, sortKey, sortDirection) => {
  let unsortedItems = [...items];
  let sort = null;
  if (sortKey === "added") {
    sort = (a, b) => {
      if (!a[sortKey] && !b[sortKey]) return 0;
      if (!a[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (!b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      const dateA = new Date(a[sortKey]);
      const dateB = new Date(b[sortKey]);
      if (dateA < dateB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    };
  } else {
    sort = (a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    };
  }
  const sortedChilds = unsortedItems.map((item) => {
    if (item?.files?.length) {
      item.files = sortBy(item.files, sortKey, sortDirection);
    }
    return item;
  });
  return sortedChilds.sort(sort);
};
