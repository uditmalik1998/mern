import React, {useState} from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.scss";

const Register = () => {
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setErr("");
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("mobile", data.mobile);
      formData.append("zipcode", data.zipcode);
      formData.append("profilepic", data.file?.[0]);
      const ans = await fetch("http://localhost:5050/api/v1/register", {
        method: "POST",
        body: formData
      });
      const jsonData = await ans.json();
      if(jsonData.error){
         setErr(jsonData.error);
      }else{
       window.localStorage.setItem("token", jsonData.token);
      }
    } catch (err) {
      setErr(err.message || "");
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
        <h3>Register</h3>
        <div className={styles.form_items}>
          <label>Name</label>
          <input className={styles.form_input} {...register("name")} />
        </div>

        <div className={styles.form_items}>
          <label>Email</label>
          <input type="email" className={styles.form_input} {...register("email", { required: true })} />
          {errors.email && (
            <span className={styles.err}>Please Enter Email</span>
          )}
        </div>

        <div className={styles.form_items}>
          <label>Password</label>
          <input type="password" className={styles.form_input} {...register("password", { required: true })} />
          {errors.password && (
            <span className={styles.err}>Please Enter Password</span>
          )}
        </div>

        <div className={styles.form_items}>
          <label>Phone</label>
          <input className={styles.form_input} {...register("phone")} />
        </div>

        <div className={styles.form_items}>
          <label>Mobile</label>
          <input className={styles.form_input} {...register("mobile", { required: true })} />
          {errors.mobile && (
            <span className={styles.err}>Please Enter Mobile Number</span>
          )}
        </div>

        <div className={styles.form_items}>
          <label>ZipCode</label>
          <input className={styles.form_input} {...register("zipcode", { required: true })} />
          {errors.zipcode && (
            <span className={styles.err}>Please Enter ZipCode</span>
          )}
        </div>

        <div className={styles.form_items}>
          <label>Profile Picture</label>
          <input
            type="file"
            name="file"
            {...register("file")}
          />
        </div>
        <input type="submit" />
        {err && <span className={styles.err}>{err}</span>}
      </form>
    </div>
  );
};

export default Register;
