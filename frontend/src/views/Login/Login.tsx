import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/useAuth";
import "./Login.css";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import AppleIcon from "../../assets/images/Apple_icon.png";
import FacebookIcon from "../../assets/images/Facebook_icon.png";
import InstagramIcon from "../../assets/images/Instagram_icon.png";
import { LoginParams } from "../../context/types";

import { useState } from "react";
import { toast } from "react-toastify";

const validation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: LoginParams) => {
    try {
      await login(form);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="card-container">
      <div className="title">
        <h2>Login</h2>
        <h5 style={{ fontSize: "15px", opacity: 0.7 }}>
          Hey, Enter your details to get sign in to your account
        </h5>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className="form-container">
        <div className="form-controller">
          <TextField
            type="text"
            id="username"
            placeholder="Nhập tên đăng nhập "
            {...register("username")}
          />
          {errors.username ? <p>{errors.username.message}</p> : ""}
        </div>

        <div className="form-controller">
          <div className="password-field-container">
            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Mật khẩu"
              {...register("password")}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password ? <p>{errors.password.message}</p> : ""}
        </div>

        <div style={{ alignSelf: "flex-start" }}>
          <a href="#">Having trouble in sign in ?</a>
        </div>
        <div className="form-controller">
          <Button
            type="submit"
            label="Sign in"
            className="login-button"
            style={{
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </div>
      </form>
      <div className="icon-buttons">
        <a
          href="https://www.apple.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="icon-button">
            <img src={AppleIcon} alt="Apple Image" />
            Apple
          </button>
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="icon-button">
            <img src={FacebookIcon} alt="Facebook Image" />
            Facebook
          </button>
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="icon-button">
            <img src={InstagramIcon} alt="Instagram Image" />
            Instagram
          </button>
        </a>
      </div>
      <div>
        <p>
          Don’t have an account? <a href="/register">Register Now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
