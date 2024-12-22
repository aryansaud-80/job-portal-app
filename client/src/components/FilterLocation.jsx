const FilterLocation = ({location, filterByLocation, setFilterByLocation}) => {
  const handleChangeLocation = (location)=>{
    setFilterByLocation(prev => prev.includes(location) ? prev.filter(item => item !== location) : [...prev, location])
  }


  return (
      <label htmlFor="location" className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          name="location"
          id="location"
          checked= {filterByLocation.includes(location)}
          onChange = {()=>handleChangeLocation(location)}
        />
        {location}
      </label>
  )
}
export default FilterLocation