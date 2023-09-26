import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDbUpdate } from "../utilities/firebase";

const Form = ({ setTerm }) => {
  const { courseId } = useParams();
  const [term, title, number, meets] = courseId.split("|");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    term: term,
    number: number,
    meetingTime: meets,
    title: title,
  });

  const databaseId = `${term[0]}${number}`;
  const [update, result] = useDbUpdate(`/courses/${databaseId}`);

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

    update({
      meets: formData.meetingTime,
      number: formData.number,
      term: formData.term,
      title: formData.title,
    });

    setTerm(term);
    navigate("/");
  };

  // Cancel button
  const handleCancel = () => {
    // Reset form data
    setFormData({
      term: "",
      number: "",
      meetingTime: "",
      title: "",
    });
    setErrors({});
    setTerm(term);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>
        Edit Course Information for {term} CS {number}
      </h2>
      <form onSubmit={handleSubmit}>
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
