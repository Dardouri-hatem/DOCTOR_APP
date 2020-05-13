import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./doctor.css";
import { Link } from "react-router-dom";
import { getDoctors } from "../../JS/actions/doctorAction";
import { Button } from "react-bootstrap";

function DoctorCard(props) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    props.getDoctors();
  }, [props.getDoctors]);

  const filterDoctorsList = () => {
    return props.doctorsList.filter(
      (doctor) =>
        doctor.name.toLowerCase().trim().includes(search.toLowerCase()) ||
        doctor.speciality.toLowerCase().trim().includes(search.toLowerCase())
    );
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return props.isLoading ? (
    <div className="row justify-content-md-center mt-5">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="acceuil">
      <h6>Make an appointment for video consultation</h6>
      <input
        type="text"
        placeholder="Doctor name , speciality ..."
        name="search"
        className="form-control search-input"
        onChange={handleChange}
      ></input>

      <div className="doctors-container">
        <div>
          {filterDoctorsList().map((doctor) => (
            <div className="doctor-card">
              <div className="avatar">
                <img
                  alt="avatar"
                  src="https://www.seekpng.com/png/full/222-2226503_doctor-flat-icon-png-doctor-flat-design-png.png"
                />
                <div>
                  <Link>{doctor.practiceName}</Link>
                  <h6>{doctor.speciality}</h6>
                  <p>
                    <i
                      class="fa fa-video-camera"
                      aria-hidden="true"
                      style={{ margin: "5px", color: "#0596de" }}
                    ></i>
                    Video consultation available
                  </p>
                  <p>
                    Adress :<br /> {doctor.address}
                  </p>
                  <Link to={`/appointment/${doctor._id}`}>
                    <Button>Make an Appointment</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pub-coronavirus">
          <div className="coronavirus">
            <h6>Together against Coronavirus (COVID-19)</h6>
          </div>
          <div className="patient-inform">
            <h5>
              <i
                className="fa fa-user-o"
                aria-hidden="true"
                style={{ color: "#0596de", margin: "5px" }}
              ></i>
              You are a patient
            </h5>
            <h6>Limit your travels and make an appointment online</h6>
            <p>
              Continue to consult your healthcare professionals on video or at
              their office Whether you have the symptoms of COVID-19 or any
              other illness, do as usual: make an appointment online for a video
              consultation or at the office. Do not give up on treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    doctorsList: state.doctor.doctorsList,
    isLoading: state.doctor.isLoading,
  };
};

export default connect(mapStateToProps, { getDoctors })(DoctorCard);
