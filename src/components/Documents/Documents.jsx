import { columns } from "../../columns";
import { useTable } from "../../hooks/useTable";
import { Folder } from "../Folder/Folder";
import "./Documents.css";

export const Documents = ({ data }) => {
  const { requestSort, getClassNamesFor, search, handleSearch, sortedItems } =
    useTable(data);

  return (
    <div className="wrapper">
      <label htmlFor="search">
        Search by File Name
        <input id="search" type="text" onChange={handleSearch} value={search} />
      </label>
      <table data-testid="documents-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                onClick={() => requestSort(column.accessor)}
                className={getClassNamesFor(column.accessor)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <Folder item={item} key={item?.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
