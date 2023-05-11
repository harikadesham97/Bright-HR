import React, { useState } from "react";
import {
  AiOutlineFile,
  AiOutlineFolder,
  AiOutlineFilePdf,
} from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";
import { BsFiletypeDoc } from "react-icons/bs";
import "./Folder.css";
export const Folder = ({ item, level = 1 }) => {
  const [expand, setExpand] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case "csv":
        return <GrDocumentCsv />;
      case "pdf":
        return <AiOutlineFilePdf />;
      case "folder":
        return <AiOutlineFolder className="type-folder" />;
      case "doc":
        return <BsFiletypeDoc />;
      default:
        return <AiOutlineFile />;
    }
  };
  return (
    <React.Fragment key={item.name}>
      <tr key={`${item.name}-${item.type}-${level}`}>
        <td
          key="name"
          className="document-name"
          onClick={() => setExpand(!expand)}
          style={{ paddingLeft: 15 * level }}
          data-testid="documents-name"
        >
          {getIcon(item.type)}
          {item.name}
        </td>
        <td key="type">{item.type}</td>
        <td key="size">{item.size}</td>
        <td key="added">{item.added}</td>
      </tr>
      {expand &&
        item?.files?.map((childItem) => (
          <Folder item={childItem} level={level + 1} />
        ))}
    </React.Fragment>
  );
};
