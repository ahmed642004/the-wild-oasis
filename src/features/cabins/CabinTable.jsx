import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const isNumericString = (str) => !isNaN(str) && !isNaN(parseFloat(str));

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  
  if (isLoading) return <Spinner />;
  if(!cabins.length) return <Empty resource="cabins"/>
  
  const filterValue = searchParams.get("discount") || 'All';
  
  const filterConditions = {
    "All": (cabin) => true,
    "No-discount": (cabin) => cabin.discount === 0,
    "With-discount": (cabin) => cabin.discount > 0,
  };
  
  const filteredCabins = cabins.filter(filterConditions[filterValue]);
  const sortBy = searchParams.get("sortBy") || 'startDate-asc';
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc"  ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
  

    // Handle numeric fields
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return (parseFloat(aValue) - parseFloat(bValue)) * modifier;
    }

    // Handle string fields
    if (typeof aValue === "string" && typeof bValue === "string") {
      const aIsNumeric = isNumericString(aValue);
      const bIsNumeric = isNumericString(bValue);

      // Prioritize non-numeric strings over numeric strings
      if (aIsNumeric && !bIsNumeric) return 1 * modifier;
      if (!aIsNumeric && bIsNumeric) return -1 * modifier;

      // Both are numeric strings, compare as numbers
      if (aIsNumeric && bIsNumeric) {
        return (parseFloat(aValue) - parseFloat(bValue)) * modifier;
      }

      // Both are non-numeric strings, compare lexicographically
      return aValue.localeCompare(bValue) * modifier;
    }

    // Fallback for mixed types
    return 0;
  });
  return (
    <Menus>
      <Table colums="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>CABIN</div>
          <div>CAPACITY</div>
          <div>PRICE</div>
          <div>DISCOUNT</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
