import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import "./CourseList.css";
import { findOverlapCourses } from "../utilities/timeConflictsFunctions.js";

const CourseList = ({ courses, term, selectedClasses, setSelectedClasses }) => {
  const formattedCourses = Object.entries(courses).map(([id, info]) => ({
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
  const newCourses = Object.entries(courses).filter(
    ([id, info]) => info.term === term
  );

  return (
    <div className="course-list">
      {Object.entries(newCourses).map(([id, info]) => (
        <div
          onClick={() =>
            selectClass({
              term: `${info[1].term}`,
              title: `${info[1].title}`,
              number: `${info[1].number}`,
              meets: `${info[1].meets}`,
            })
          }
          key={{
            term: `${info[1].term}`,
            title: `${info[1].title}`,
            number: `${info[1].number}`,
            meets: `${info[1].meets}`,
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
                    term: `${info[1].term}`,
                    title: `${info[1].title}`,
                    number: `${info[1].number}`,
                    meets: `${info[1].meets}`,
                  })
                );
              })
                ? "success"
                : overlapCourses.some((overlapCourse) => {
                    return (
                      JSON.stringify(overlapCourse) ===
                      JSON.stringify({
                        term: `${info[1].term}`,
                        title: `${info[1].title}`,
                        number: `${info[1].number}`,
                        meets: `${info[1].meets}`,
                      })
                    );
                  })
                ? "danger"
                : ""
            }
          >
            <Card.Body className="card-content">
              <Card.Title style={{ textAlign: "left", marginLeft: 10 }}>
                {info[1].term} CS {info[1].number}
              </Card.Title>
              <Card.Text style={{ textAlign: "left", marginLeft: 10 }}>
                {info[1].title}
              </Card.Text>
              <div className="bottom-text">
                <hr />
                <Card.Text style={{ textAlign: "left", marginLeft: 10 }}>
                  {info[1].meets}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
