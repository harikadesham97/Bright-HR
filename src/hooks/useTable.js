import { useMemo, useState } from "react";
import { sortBy } from "../utils/sortBy";
import { filterDataByName } from "../utils/filterBy";

export const useTable = (data) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [search, setSearch] = useState("");

  //search
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredItems = useMemo(() => {
    let filteredItems = [...data];
    if (search) {
      filteredItems = filterDataByName(filteredItems, search);
    }
    return filteredItems;
  }, [data, search]);

  //sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else {
        direction = null;
      }
    }
    direction ? setSortConfig({ key, direction }) : setSortConfig(null);
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return "default";
    }
    return sortConfig.key === name ? sortConfig.direction : "default";
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...filteredItems];
    if (sortConfig !== null) {
      sortableItems = sortBy(
        sortableItems,
        sortConfig.key,
        sortConfig.direction
      );
    }
    return sortableItems;
  }, [filteredItems, sortConfig]);

  return {
    search,
    handleSearch,
    requestSort,
    getClassNamesFor,
    sortedItems,
  };
};
