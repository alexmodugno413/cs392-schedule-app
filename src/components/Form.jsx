import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Form = ({ selectedClasses }) => {
  const { courseId } = useParams();
  const [term, title, number, meets] = courseId.split("|");
  const navigate = useNavigate();
  console.log("selectedClasses", selectedClasses);

  const [formData, setFormData] = useState({
    term: term,
    number: number,
    meetingTime: meets,
    title: title,
  });

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submission button
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Cancel button
  const handleCancel = () => {
    navigate("/");
    // Reset form data
    setFormData({
      term: "",
      number: "",
      meetingTime: "",
      title: "",
    });
  };

  return (
    <div className="container">
      <h2>Edit Course Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="term">Term</label>
          <input
            type="text"
            className="form-control"
            id="term"
            name="term"
            value={formData.term}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number</label>
          <input
            type="text"
            className="form-control"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="meetingTime">Meeting Time</label>
          <input
            type="text"
            className="form-control"
            id="meetingTime"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
