import React from "react";
import "./TextField.css";

interface ButtonProps {
  placeholder?: string;
  id?: string;
  type?: string;
  className?: string;
}

const TextField = React.forwardRef<HTMLInputElement, ButtonProps>(
  ({ type, id, placeholder, className, ...rest }, ref) => {
    return (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`custom-textField ${className}`}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default TextField;
