import PropTypes from 'prop-types';

export function Input({ type, id, onChange, name, placeholder }) {
  return (
    <>
      <input
        className={`
          p-2 w-[16rem] rounded-lg focus:outline focus:outline-[1px] outline-tree-poppy-600
          md:w-[20rem] md:text-[1.2rem] md:p-3`}
        type={type}
        id={id}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        autoComplete='off'
      />
    </>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}