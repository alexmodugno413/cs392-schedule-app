import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import "./CourseList.css";
import { findOverlapCourses } from "../utilities/timeConflictsFunctions.js";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CourseList = ({
  courses,
  term,
  setTerm,
  selectedClasses,
  setSelectedClasses,
}) => {
  const formattedCourses = Object.entries(courses).map(([id, info]) => ({
    id: `${info.term}|${info.title}|${info.number}|${info.meets}`,
    validId: id,
    term: `${info.term}`,
    title: `${info.title}`,
    number: `${info.number}`,
    meets: `${info.meets}`,
  }));
  const overlapCourses = findOverlapCourses(formattedCourses, selectedClasses);

  const selectClass = (classTitle) => {
    var isPresent = selectedClasses.some((selectedClass) => {
      return selectedClass.validId === classTitle.validId;
    });
    var isOverlap = overlapCourses.some((overlapCourse) => {
      return overlapCourse.validId === classTitle.validId;
    });
    if (isOverlap) {
      return;
    }
    // if class not already selected, select
    if (!isPresent) {
      setSelectedClasses([...selectedClasses, classTitle]);
    } else {
      setSelectedClasses(
        selectedClasses.filter((selectedClass) => {
          return selectedClass.validId !== classTitle.validId;
        })
      );
    }
  };
  const newCourses = formattedCourses.filter((course) => course.term === term);

  return (
    <div className="course-list">
      {newCourses.map((course) => (
        <div
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
                return selectedClass.validId === course.validId;
              })
                ? "success"
                : overlapCourses.some((overlapCourse) => {
                    return overlapCourse.validId === course.validId;
                  })
                ? "danger"
                : ""
            }
          >
            <Card.Body
              className="card-content"
              onClick={() =>
                selectClass({
                  id: `${course.term}|${course.title}|${course.number}|${course.meets}`,
                  validId: `${course.validId}`,
                  term: `${course.term}`,
                  title: `${course.title}`,
                  number: `${course.number}`,
                  meets: `${course.meets}`,
                })
              }
            >
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
              </div>
            </Card.Body>
            <Link to={`/courses/${course.id}`}>
              <Button id="edit-button" variant="secondary">
                Edit Course
              </Button>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
