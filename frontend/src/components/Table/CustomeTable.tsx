import { ColumnDefinitionType } from "./ColumnDefinitionType";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import './CustomeTable.css';

type TableProps<T> = {
  data: Array<T> | undefined;
  columns: Array<ColumnDefinitionType<T>>;
};

const style = {
  borderCollapse: "collapse",
  width: "100%",
} as const;

const CustomeTable = <T,>({ data, columns }: TableProps<T>): JSX.Element => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <TableHeader columns={columns} />
        <TableRows data={data} columns={columns} />
      </table>
    </div>
  );
};

export default CustomeTable;
