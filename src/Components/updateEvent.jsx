import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { validateFormData } from '../Helpers/loginValidation';



let options = [
    { value: "", label: "Set priority" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  let statusOptions = [
    { value: "", label: "Change Status" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "In Progress" },
  ];
function UpdateEvent() {
  //! STATES
  let [startDate, setStartDate] = useState(new Date());
  let [EventData, setEventData] = useState({
    title: "",
    location: "",
    date: new Date(),
    description: "",
    status: statusOptions[0].value,
  });
  let [formErrors, setformErrors] = useState({});
  let [successMsg, setSuccessMsg] = useState("");
  let { id } = useParams();
  let navigateToEvent = useNavigate();

  //! TO CHANGE THE VALUES
  let changeEvent = ({ target: { name, value } }) => {
    setEventData({ ...EventData, [name]: value });
  };

  //^ FOR SELECT OPTION

  let getSelectOption = (selectedOption) => {
    setEventData({ ...EventData, priority: selectedOption.value });
  };

  let getStatusOption = (selectedOption) => {
    setEventData({ ...EventData, status: selectedOption.value });
  };
  //^ FOR DATE CHANGE

  let handleDateChange = (date) => {
    setStartDate(date);
    setEventData({ ...EventData, duedate: date });
  };

  //! TO GET THE SINGLE DATA

  let getSingleEvent = async () => {
    try {
      console.log(id);n
      if (!id) {
        throw new Error("No ID provided");
      }
      let token = localStorage.getItem("token");

      let { data } = await axios.get(
        `http://localhost:3000/api/getonetask/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(data.data);
      setEventData({
        title: data.data.title,
        location: data.data.location,
        date: new Date(data.data.date),
        description: data.data.description,
        status: data.data.status,
      });
      setStartDate(new Date(data.data.duedate));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSingleEvent();
  }, [id]);

  //! TO UPDATE EXPENSE

  let updateEvent = async (e) => {
    e.preventDefault();

    setformErrors(validateFormData(EventData));
    let fdataLength = Object.keys(validateFormData(EventData)).length;

    if (fdataLength === 0) {
      try {
        let token = localStorage.getItem("token");
        let { data } = await axios.put(
          `http://localhost:3000/api/updatetask/${id}`,
          EventData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(data);
        setSuccessMsg(data.message);
        setTimeout(() => {
          setSuccessMsg("");
          navigateToEvent("/events");
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section className="update-task-form">
      {successMsg && <p className="popup">{successMsg}</p>}
      <div className="task-div">
        <h1>Update Event</h1>
        <form className="Event-form">
          <div className="divs">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={EventData.title}
              onChange={changeEvent}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "black" }}>
            {formErrors.title}
          </small>

          <div className="divs">
            <label>Priority:</label>

            <Select
              value={
                options.find(
                  (option) => option.value === EventData.priority
                ) || {
                  value: EventData.priority,
                  label: EventData.priority,
                }
              }
              className="select"
              options={options}
              onChange={getSelectOption}
              name="priority"
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "black" }}>
            {formErrors.priority}
          </small>
          <div className="divs">
            <label>Status:</label>
            <Select
              value={
                statusOptions.find(
                  (option) => option.value === EventData.status
                ) || {
                  value: EventData.status,
                  label: EventData.status,
                }
              }
              className="select"
              options={statusOptions}
              onChange={getStatusOption}
              name="status"
            />
          </div>
          <div className="divs">
            <label>Date:</label>
            <DatePicker
              selected={startDate}
              name="date"
              onChange={handleDateChange}
              minDate={new Date()}
            />
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "black" }}>
            {formErrors.date}
          </small>

          <div className="divs">
            <label htmlFor="desc">Description:</label>
            <textarea
              name="description"
              id="desc"
              value={EventData.description}
              onChange={changeEvent}
            ></textarea>
          </div>
          <small style={{ padding: "0px 0px 0px 5px", color: "black" }}>
            {formErrors.description}
          </small>

          <button type="submit" className="add-btn" onClick={updateEvent}>
            Update Task
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateEvent