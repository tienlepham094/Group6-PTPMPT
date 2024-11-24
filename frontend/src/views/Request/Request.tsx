import React from "react";
import CustomeTable from "../../components/Table/CustomeTable";

export const Request = () => {
  return (
    <>
      <div>Header</div>
      <div>
        <CustomeTable data={data} columns={columns} />
      </div>
      <div>Footer</div>
    </>
  );
};
