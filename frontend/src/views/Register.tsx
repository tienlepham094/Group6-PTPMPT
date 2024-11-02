import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
  role: "ADMIN" | "USER";
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
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
    <section>
      <div>
        <h1>Sign up for an account</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              {...register("userName")}
            />
            {errors.userName && <p>{errors.userName.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select id="role" {...register("role")}>
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
            {errors.role && <p>{errors.role.message}</p>}
          </div>
          <button type="submit">Sign up</button>
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
