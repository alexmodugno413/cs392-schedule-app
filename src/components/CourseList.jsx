import { useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import "./CourseList.css";

const CourseList = ({ courses, term, selectedClasses, setSelectedClasses }) => {
  const selectClass = (classTitle) => {
    // LOGIC FOR CATCHING TIME CONFLICTS, ADD FUNCTION FOR DAY AND TIME OVERLAP
    console.log("classTitle", classTitle);

    var isPresent = selectedClasses.some((selectedClass) => {
      return JSON.stringify(selectedClass) === JSON.stringify(classTitle);
    });
    // if class not already selected, select
    if (!isPresent) {
      // logic for time conflicts
      setSelectedClasses([...selectedClasses, classTitle]);
    } else {
      setSelectedClasses(
        selectedClasses.filter((selectedClass) => {
          return JSON.stringify(selectedClass) !== JSON.stringify(classTitle);
        })
      );
    }
    console.log("selectedClasses", selectedClasses);
  };
  const newCourses = Object.entries(courses).filter(
    ([id, info]) => info.term === term
  );
  return (
    <div className="course-list">
      {Object.entries(newCourses).map(([id, info]) => (
        <div
          onClick={() =>
            selectClass([
              `${info[1].term}`,
              `${info[1].title}`,
              `${info[1].number}`,
              `${info[1].meets}`,
            ])
          }
          key={[
            `${info[1].term}`,
            `${info[1].title}`,
            `${info[1].number}`,
            `${info[1].meets}`,
          ]}
        >
          <Card
            className="left-aligned-card"
            style={{ width: "12.5rem" }}
            bg={
              selectedClasses.some((selectedClass) => {
                return (
                  JSON.stringify(selectedClass) ===
                  JSON.stringify([
                    `${info[1].term}`,
                    `${info[1].title}`,
                    `${info[1].number}`,
                    `${info[1].meets}`,
                  ])
                );
              })
                ? "success"
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
