import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./index.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const ans = await axios.post("http://localhost:5050/api/v1/login", {
        ...data,
      });
      if(ans.data.token){
        window.localStorage.setItem("token", ans.data.token);
      }
      console.log(ans);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.register_container}>
      <form
        className={styles.formData}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h3>Login</h3>
        <div className={styles.form_items}>
          <label>Email</label>
          <input
            type="email"
            className={styles.form_input}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className={styles.err}>Please Enter Email</span>
          )}
        </div>

        <div className={styles.form_items}>
          <label>Password</label>
          <input
            type="password"
            className={styles.form_input}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className={styles.err}>Please Enter Password</span>
          )}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
