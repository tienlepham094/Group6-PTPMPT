import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import "./Login.css";
import TextField from "../../components/TextField";
// type Props = {};

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.userName, form.password);
  };
  return (
    <div className="form-container">
      <h3>Account Login</h3>
      <h3>Hey, Enter your details to get sign in to your account</h3>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-item">
          <TextField
            type="text"
            id="username"
            placeholder="Enter Email "
            {...register("userName")}
          />
          {errors.userName ? <p>{errors.userName.message}</p> : ""}
        </div>
        <div className="form-item">
          <TextField
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password ? <p>{errors.password.message}</p> : ""}
        </div>
        <div>
          <a href="#">Having trouble in sign in ?</a>
        </div>
        <button type="submit">Sign in</button>
        <p>
          Don’t have an account yet? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
