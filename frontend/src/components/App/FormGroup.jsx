import PropTypes from "prop-types";


export function FormGroup({ label, name, value, type, onChange, placeholder, width = "" }) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={name} className="text-white/50 font-lexend text-[0.90rem] font-light">
          {label.length > 27 ? `${label.slice(0, 24)}...` : label}
        </label>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          name={name}
          value={value || ""}
          className={`bg-oxford-blue-700 sm:w-[${width}rem] md:w-[14rem] text-white/65 rounded-lg p-2 px-3`}
          onChange={onChange}          
          autoComplete="off"
        />
      </div>
    </>
  );
}

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.string,
};