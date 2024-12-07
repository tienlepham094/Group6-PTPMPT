export type ColumnDefinitionType<T> =
  | {
      key: keyof T; // Keys of T for standard columns
      header: string;
      width?: number;
      render?: (row: T) => React.ReactNode; // Optional custom render function
    }
  | {
      key: "actions"; // Special case for actions column
      header: string;
      width?: number;
      render: (row: T) => React.ReactNode; // Custom render function is required for actions
    };
