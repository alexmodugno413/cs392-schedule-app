import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import "./CourseList.css";

const CourseList = ({ courses, term }) => {
  const newCourses = Object.entries(courses).filter(
    ([id, info]) => info.term === term
  );
  console.log("newCourses", newCourses);
  return (
    <div className="course-list">
      {Object.entries(newCourses).map(([id, info]) => (
        <Card className="left-aligned-card" style={{ width: "12.5rem" }}>
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
      ))}
    </div>
  );
};

export default CourseList;
