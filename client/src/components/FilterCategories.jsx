const FilterCategories = ({category,filterByCategory, setFilterByCategory}) => {

  const handleChangeCategory = (category) => {
    setFilterByCategory(prev => prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category])
  }

  return (
    <label htmlFor="job" className="flex items-center gap-2 mb-2">
    <input
      type="checkbox"
      name="location"
      id="location"
      checked= {filterByCategory.includes(category)}
      onChange = {()=> handleChangeCategory(category)}
    />
    {category}
  </label>
  )
}
export default FilterCategories