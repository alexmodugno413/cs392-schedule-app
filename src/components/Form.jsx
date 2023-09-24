import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Form = () => {
  const { courseId } = useParams();
  const [term, title, number, meets] = courseId.split("|");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    term: term,
    number: number,
    meetingTime: meets,
    title: title,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    const newErrors = { ...errors };

    switch (name) {
      case "term":
        // Make sure term is "Fall", "Winter", or "Spring"
        if (!/^(Fall|Winter|Spring)$/.test(value)) {
          newErrors.term = "Term must be 'Fall', 'Winter', or 'Spring'";
        } else {
          delete newErrors.term;
        }
        break;
      case "number":
        // Make sure number is a number
        if (!/^\d+$/.test(value)) {
          newErrors.number = "Number must be a valid number";
        } else {
          delete newErrors.number;
        }
        break;
      case "meetingTime":
        // Make sure number matches format like "MWF 9:00-9:50" or "TuTh 14:00-15:20" or "MW 9:00-9:50"
        if (!/^(MWF|TuTh|MW) \d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(value)) {
          newErrors.meetingTime =
            "Meeting Time format should be 'MWF hh:mm-hh:mm' or 'TuTh hh:mm-hh:mm' or 'MW hh:mm-hh:mm'";
        } else {
          delete newErrors.meetingTime;
        }
        break;
      case "title":
        // Make sure title has at least two characters
        if (value.length < 2) {
          newErrors.title = "Title must have at least two characters";
        } else {
          delete newErrors.title;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Submission button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length != 0) {
      return;
    }
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
    setErrors({});
  };

  return (
    <div className="container">
      <h2>Edit Course Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="term">Term</label>
          <input
            type="text"
            className={`form-control ${errors.term ? "is-invalid" : ""}`}
            id="term"
            name="term"
            value={formData.term}
            onChange={handleInputChange}
          />
          {errors.term && <div className="invalid-feedback">{errors.term}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="number">Number</label>
          <input
            type="text"
            className={`form-control ${errors.number ? "is-invalid" : ""}`}
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
          {errors.number && (
            <div className="invalid-feedback">{errors.number}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="meetingTime">Meeting Time</label>
          <input
            type="text"
            className={`form-control ${errors.meetingTime ? "is-invalid" : ""}`}
            id="meetingTime"
            name="meetingTime"
            value={formData.meetingTime}
            onChange={handleInputChange}
          />
          {errors.meetingTime && (
            <div className="invalid-feedback">{errors.meetingTime}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
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
