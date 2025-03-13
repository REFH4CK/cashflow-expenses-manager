import PropTypes from 'prop-types';

export function Input({type, id, onChange, placeholder}) {
  return (
    <>
      <input
        type={type}
        id={id}
        autoComplete="off"
        onChange={onChange}
        placeholder={placeholder}
        className="w-[15rem] outline-none bg-white text-black/70 rounded-lg p-2"
      />
    </>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}
