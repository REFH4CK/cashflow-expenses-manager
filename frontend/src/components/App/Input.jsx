import PropTypes from 'prop-types';

export function Input({ type, id, onChange, placeholder, className, name, value }) {
  const handleChange = (e) => {
    // Asegura que el evento tenga la estructura esperada
    const syntheticEvent = {
      target: {
        name: name,
        value: e.target.value
      }
    };
    onChange(syntheticEvent);
  };

  return (
    <input
      type={type}
      id={id}
      onChange={handleChange} // Usa nuestro manejador seguro
      placeholder={placeholder}
      className={className}
      name={name}
      value={value}
      autoComplete="off"
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};