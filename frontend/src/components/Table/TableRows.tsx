import { ReactNode } from "react";
import { ColumnDefinitionType } from "./ColumnDefinitionType";
import "./TableRows.css";
type TableRowsProps<T> = {
  data: Array<T> | undefined;
  columns: Array<ColumnDefinitionType<T>>;
};

const style = {
  border: "1px solid black",
  padding: "8px",
};

const TableRows = <T,>({ data, columns }: TableRowsProps<T>): JSX.Element => {
  const rows = data?.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns?.map((column, index2) => {
          const cellContent =
            column.render && column.key === "actions"
              ? column.render(row)
              : (row[column.key as keyof T] as ReactNode);

          return (
            <td key={`cell-${index2}`} style={style}>
              {cellContent}
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default TableRows;
