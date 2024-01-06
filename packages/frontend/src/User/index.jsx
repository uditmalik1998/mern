import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";

const User = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [nearestUser, setNearestUser] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      setLocation({ lat: lat, long: long });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ans = await axios.post(
          "http://localhost:5050/api/v1/nearestUser",
          {
            ...location,
          }
        );
        setNearestUser(ans.data.nearestUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (location.lat !== 0 || location.latitude !== 0) {
      fetchData();
    }
  }, [location]);

  return (
    <div>
      {nearestUser?.map((item) => {
        return (
          <div className={styles.user_container}>
            <span>{item?.name}</span>
            <span>{item?.phone}</span>
            <span>{item?.email}</span>
            <img
              src={`http://localhost:5050/images/${item?.profilepic?.filename}`}
              alt="..."
            />
          </div>
        );
      })}
    </div>
  );
};

export default User;
