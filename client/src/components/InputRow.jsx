import { MDBInput } from "mdb-react-ui-kit";

const InputRow = ({
  label,
  type,
  email,
  name,
  onChange,
  required,
  validation,
}) => {
  return (
    <MDBInput
      label={label}
      type={type}
      value={email}
      name={name}
      onChange={onChange}
      required={required}
      validation="Please provide your email"
    />
  );
};
export default InputRow;
