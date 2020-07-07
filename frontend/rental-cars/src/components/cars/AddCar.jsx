import React, {Fragment, useState} from "react";
import s from "./add_car.module.css";
import {fetchCarsError} from "../../redux/actions/carsActions";
import swal from "sweetalert";
import {Redirect} from "react-router";

export const AddCar = () => {
  const [carDescription, setCarDescription] = useState("");
  const [cost, setCost] = useState("");
  const [successSubmit, setSuccessSubmit] = useState(false);

  const handleClick = (e) => {
    e.preventDefault()
    const data = {
      "description": carDescription,
      "cost": cost
    }
    let url = "http://localhost:5000/api/cars"
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((res => {
        if (res.status === 200) {
          swal("Car added!",
            "", "success")
            .then(() => setSuccessSubmit(true))
        }
      }))

  }

  return (
    <Fragment>
      {successSubmit && <Redirect to={"/cars"}/>}
      <div className={s.baseContainer}>
        <div className={s.header}>
          Add car
        </div>
        <form>
          <div className={s.formGroup}>
            <input
              type="text"
              name="Car description"
              placeholder="Car description"
              autoComplete="off"
              onChange={(e) => setCarDescription(e.target.value)}
            />
          </div>
          <div className={s.formGroup}>
            <input
              type="number"
              min="0"
              max="1000"
              name="Cost"
              placeholder="Cost"
              autoComplete="off"
              onChange={(e) => setCost(e.target.value)}
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
