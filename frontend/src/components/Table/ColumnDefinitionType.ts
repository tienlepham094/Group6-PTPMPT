export type ColumnDefinitionType<T> = {
  key: keyof T; // now we don't need the 'K extends keyof T' anymore!
  header: string;
  width?: number;
};
