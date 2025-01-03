import React from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

const SortBy = ({options}) => {
  const [searchParams,setSearchParams] = useSearchParams()
  const sortBy = searchParams.get("sortBy") || ""
  function handleChange(e){
    searchParams.set("sortBy",e.target.value)
    setSearchParams(searchParams)
  }
  return (
    <div>
      <Select options={options} value={sortBy} type="white" onChange={handleChange}/>
    </div>
  );
};

export default SortBy;