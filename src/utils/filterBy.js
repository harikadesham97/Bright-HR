export function filterDataByName(data, search) {
  return data.filter((parent) => {
    if (parent.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    if (parent.files) {
      return filterDataByName(parent.files, search).length > 0;
    }
    return false;
  });
}
