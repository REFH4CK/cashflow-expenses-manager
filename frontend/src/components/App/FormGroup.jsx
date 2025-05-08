import PropTypes from "prop-types";


export function FormGroup({ label, name, value, type, onChange, placeholder }) {
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
          name={name} // Asegúrate de pasar el `name`
          value={value || ""} // Siempre usa una cadena, incluso si está vacía
          className="bg-oxford-blue-700 md:w-[14rem] text-white/65 rounded-lg p-2 px-3"
          onChange={onChange}          
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
  placeholder: PropTypes.string
};