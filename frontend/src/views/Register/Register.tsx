import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import "./Register.css";
import AppleIcon from "../../assets/images/Apple_icon.png";
import FacebookIcon from "../../assets/images/Facebook_icon.png";
import InstagramIcon from "../../assets/images/Instagram_icon.png";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  role: "ADMIN" | "USER";
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.mixed<"ADMIN" | "USER">()
    .oneOf(["ADMIN", "USER"], "Role is required")
    .required("Role is required"),
});

const Register = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password, form.role);
  };

  return (
    <div className="card-container">
      <div className="title">
        <h3>Register Form</h3>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="form-container">
        <div className="form-controller">
          <TextField
            type="text"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-controller">
          <TextField
            type="text"
            id="username"
            placeholder="Username"
            {...register("userName")}
          />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>
        <div className="form-controller">
          <TextField
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-controller">
          <TextField
            type="password"
            id="confirmPassword"
            placeholder="Re-enter Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="form-controller">
          <select id="role" {...register("role")} className="custom-select">
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
          {errors.role && <p>{errors.role.message}</p>}
        </div>
        <div className="form-controller">
          <Button type="submit" label="Sign up" className="login-button" />
        </div>
      </form>
      <div className="icon-buttons">
        <button className="icon-button">
          <img src={AppleIcon} alt="Apple Image" />
          Apple
        </button>
        <button className="icon-button">
          <img src={FacebookIcon} alt="Facebook Image" />
          Facebook
        </button>
        <button className="icon-button">
          <img src={InstagramIcon} alt="Instagram Image" />
          Instagram
        </button>
      </div>

      <div>
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
