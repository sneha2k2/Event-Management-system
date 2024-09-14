import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiSortAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";


function Events() {
  //! STATES
  let [Events, setEvents] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [filter, setFilter] = useState({
    title: "",
    description: "",
    location: "",
    Date: "",
  });
  let [sortTask, setSortTask] = useState("title");

  let navigateToUpdateEvent = useNavigate();
  let token = localStorage.getItem("token");



  let getEvents = async () => {
    try {
      let { data } = await axios.get(`http://localhost:3000/api/getEvents`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setEvents(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  //! TO UPDATE AND DELETE TASK

  let updateEvent = (id) => {
    navigateToUpdateEvent(`/updateEvent/${id}`);
  };

  let deleteEvent = async (id) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/deletetask/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // getEvents();
    } catch (err) {
      console.error(err);
    }
  };
  let getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "Event-completed";
      case "pending":
        return "Event-to-do";
      case "in-progress":
        return "Event-in-progress";
      default:
        return "";
    }
  };
  return (
    <section className="event-data">
      <div className="event-nav">
        <h1>My Events</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button className="nav-btn">
          <BiSortAlt2
            onClick={() => {
              setSortTask(sortTask === "title" ? "-title" : "title");
            }}
          />
        </button>
        <button className="nav-btn">
          <FaFilter
            onClick={() => {
              setFilter({ ...filter, title: searchValue });
            }}
          />
        </button>
        <NavLink
          to="/addtask"
          className="nav-btn"
          style={{ backgroundColor: "green" }}
        >
          New
          <IoMdAdd />
        </NavLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>date</th>
            <th>location</th>
            <th>Description</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Events.map(
            ({ title, Date, location, status, description, _id }, index) => {
              console.log("Status:", status);
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{new Date(Date).toLocaleDateString()}</td>
                  <td>{location}</td>
                  <td>{description}</td>
                  <td>
                    <p className={getStatusClass(status)}>{status}</p>
                  </td>
                  <td>
                    <button
                      className="edtbtn"
                      onClick={() => {
                        updateEvent(_id);
                      }}
                    >
                      <MdEdit/>
                    </button>
                  </td>

                  <td>
                    <button
                      className="dltbtn"
                      onClick={() => {
                        deleteEvent(_id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </section>
  );
}
export default Events;