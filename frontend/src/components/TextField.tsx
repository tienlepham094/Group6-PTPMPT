import "./TextField.css";
interface ButtonProps {
  placeholder: string;
  id: string;
  type: string;
}
const TextField = ({ type, id, placeholder }: ButtonProps) => {
  return <input type={type} id={id} placeholder={placeholder} />;
};

export default TextField;
