import { ColumnDefinitionType } from "./ColumnDefinitionType";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

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
    <table style={style}>
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </table>
  );
};

export default CustomeTable;
