import { MDBInput } from "mdb-react-ui-kit";

const InputRow = ({
  label,
  type,
  value,
  name,
  onChange,
  required,
  validation,
}) => {
  return (
    <MDBInput
      label={label}
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      required={required}
      className='form-control'
      validation="Please provide your email"
    />
  );
};
export default InputRow;
