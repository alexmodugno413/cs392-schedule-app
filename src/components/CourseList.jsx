import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import "./CourseList.css";
import { findOverlapCourses } from "../utilities/timeConflictsFunctions.js";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CourseList = ({ courses, term, selectedClasses, setSelectedClasses }) => {
  const formattedCourses = Object.entries(courses).map(([id, info]) => ({
    id: `${info.term}|${info.title}|${info.number}|${info.meets}`,
    term: `${info.term}`,
    title: `${info.title}`,
    number: `${info.number}`,
    meets: `${info.meets}`,
  }));
  const overlapCourses = findOverlapCourses(formattedCourses, selectedClasses);

  const selectClass = (classTitle) => {
    var isPresent = selectedClasses.some((selectedClass) => {
      return JSON.stringify(selectedClass) === JSON.stringify(classTitle);
    });
    // if class not already selected, select
    if (!isPresent) {
      setSelectedClasses([...selectedClasses, classTitle]);
    } else {
      setSelectedClasses(
        selectedClasses.filter((selectedClass) => {
          return JSON.stringify(selectedClass) !== JSON.stringify(classTitle);
        })
      );
    }
  };
  const newCourses = formattedCourses.filter((course) => course.term === term);

  return (
    <div className="course-list">
      {newCourses.map((course) => (
        <div
          onClick={() =>
            selectClass({
              term: `${course.term}`,
              title: `${course.title}`,
              number: `${course.number}`,
              meets: `${course.meets}`,
            })
          }
          key={{
            term: `${course.term}`,
            title: `${course.title}`,
            number: `${course.number}`,
            meets: `${course.meets}`,
          }}
        >
          <Card
            className="left-aligned-card"
            style={{ width: "12.5rem" }}
            bg={
              selectedClasses.some((selectedClass) => {
                return (
                  JSON.stringify(selectedClass) ===
                  JSON.stringify({
                    term: `${course.term}`,
                    title: `${course.title}`,
                    number: `${course.number}`,
                    meets: `${course.meets}`,
                  })
                );
              })
                ? "success"
                : overlapCourses.some((overlapCourse) => {
                    return (
                      JSON.stringify(overlapCourse) ===
                      JSON.stringify({
                        id: `${course.id}`,
                        term: `${course.term}`,
                        title: `${course.title}`,
                        number: `${course.number}`,
                        meets: `${course.meets}`,
                      })
                    );
                  })
                ? "danger"
                : ""
            }
          >
            <Card.Body className="card-content">
              <Card.Title style={{ textAlign: "left", marginLeft: 10 }}>
                {course.term} CS {course.number}
              </Card.Title>
              <Card.Text style={{ textAlign: "left", marginLeft: 10 }}>
                {course.title}
              </Card.Text>
              <div className="bottom-text">
                <hr />
                <Card.Text style={{ textAlign: "left", marginLeft: 10 }}>
                  {course.meets}
                </Card.Text>
                <Link to={`/courses/${course.id}`}>
                  <Button variant="secondary">Edit Course</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
