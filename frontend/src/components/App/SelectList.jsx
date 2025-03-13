import PropTypes from 'prop-types'

export function SelectList({ name, id, data, onChange }) {
  return (
    <>
      <label htmlFor={id} className='capitalize font-lexend text-[.85rem]'>{name}</label>
      <select
        name={name}
        id={id}
        className="w-[14rem] bg-[#263141] text-pretty rounded-md p-2"
        required
        onChange={onChange}
      >
        <option value="">Select {name}</option>
        {data.map((item, i) => (
          <option value={item.name} key={i}>
            {`${item.name} ${item.country ? ` - ${item.country}` : ""}`}
          </option>
        ))}
      </select>
    </>
  );
}

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}
