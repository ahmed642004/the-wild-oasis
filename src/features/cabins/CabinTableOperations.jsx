import React from 'react';
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy';
const CabinTableOperations = () => {
  return (
    <TableOperations>
        <Filter filterField= 'discount' options={[{
            value:"All",
            label:"All"
        },
        {
            value:"No-discount",
            label:"No discount"
        },
        {
            value:"With-discount",
            label:"With discount"
        },
        ]}/>
        <SortBy options={[{
            value:"name-asc",
            label:"Sort By Name (A-Z)"
        },
        {
         value:"name-des",
            label:"Sort By Name (Z-A)"
        },
        {
            value:"regularPrice-des",
            label:"Price (high-low)"
        },
        {
            value:"regularPrice-asc",
            label:"Price (low-high)"
        },
        {
            value:"maxCapacity-des",
            label:"maxCapacity (high-low)"
        },
        {
            value:"maxCapacity-asc",
            label:"maxCapacity (low-high)"
        }
        ]}/>
    </TableOperations>
  );
};

export default CabinTableOperations;