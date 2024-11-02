import "./Button.css";
interface ButtonProps {
  label?: string | "Button";
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  className?: string;
  style?: object;
}
const Button = ({
  className,
  disabled,
  label,
  onClick,
  style,
  type,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${className}`}
      style={style}
    >
      {label}
    </button>
  );
};

export default Button;
