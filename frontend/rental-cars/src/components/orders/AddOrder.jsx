import React, {Fragment, useEffect, useState} from "react";
import s from "./add_order.module.css";
import swal from "sweetalert";
import {Redirect} from "react-router";
import auth from "../../authentification/auth";
import Select from 'react-select';

export const AddOrder = () => {
  const [carId, setCarId] = useState("");
  const [rentalTime, setRentalTime] = useState("");
  const [jwtToken, setJwtToken] = useState("")
  const [cars, setCars] = useState({})
  const [carOptions, setCarOptions] = useState([{ value: 'loading', label: 'Cars loading ...' }])

  const [successSubmit, setSuccessSubmit] = useState(false);
  const [notAuthRedirect, setNotAuthRedirect] = useState(false);

  const handleNotAuth = () => {
    swal("Log in first",
      "", "warning")
      .then(() => setNotAuthRedirect(true))
  }

  useEffect(() => {
    const numOfItems = 20;
    let url = `http://localhost:5000/api/cars/table?num_of_items=${numOfItems}&offset=0`;
    fetch(url)
      .then(res => {
        if (res.error) {
          throw(res.error);
        }
        return res.json()
      })
      .then(data => {
        setCars(data)
      })
      .catch(error => {
        console.log("error")
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (cars.hasOwnProperty("items")){
      setCarOptions(cars.items.map((elem) => {
        return { value: elem.car_id, label: elem.car_description}
      }))
      fetch("http://localhost:5000/get_jwt", {credentials: "include"})
        .then(res => {
          if (res.error) {
            throw(res.error);
          }
          return res.json()
        })
        .then(data => {
          setJwtToken(data.jwt)
        })
        .catch(error => {
          console.log("error")
          console.log(error)
        })
    }
  }, [cars])

  const handleClick = (e) => {
    e.preventDefault()
    console.log("Submitting")

    const data = {
      "id_car": carId,
      "rental_time": rentalTime,
      "jwt": jwtToken
    }
    let url = "http://localhost:5000/api/orders"
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((res => {
        if (res.status === 200) {
          swal("Order added!",
            "", "success")
            .then(() => setSuccessSubmit(true))
        }
        console.log(res)
      }))
      .catch((error) => {
        console.log(error)
      })
  }
  console.log("rendered")
  return (
    <Fragment>
      {successSubmit && <Redirect to={"/orders"}/>}
      {!auth.isAuthentificated() && <Redirect to={"/login"}/>}
      <div className={s.baseContainer}>
        <div className={s.header}>
          Add order
        </div>
        <form>
          <div className={s.formGroup}>
            <Select
              options={carOptions}
              placeholder="Select car"
              onChange={(e) => setCarId(e.value)}
            />
          </div>
          <br/>
          <div className={s.formGroup}>
            <input
              type="number"
              min="1"
              max="100"
              name="rental_time"
              placeholder="Rental time"
              autoComplete="off"
              onChange={(e) => setRentalTime(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className={s.btn} onClick={(e) => handleClick(e)}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
