import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import "./CourseList.css";

const CourseList = ({ courses }) => (
  <div className="course-list">
    {Object.entries(courses).map(([id, info]) => (
      <Card className="left-aligned-card" style={{ width: "12.5rem" }}>
        <Card.Body className="card-content">
          <Card.Title style={{ textAlign: "left", marginLeft: 10 }}>
            {info.term} CS {info.number}
          </Card.Title>
          <Card.Text style={{ textAlign: "left", marginLeft: 10 }}>
            {info.title}
          </Card.Text>
          <div className="bottom-text">
            <hr />
            <Card.Text style={{ textAlign: "left", marginLeft: 10 }}>
              {info.meets}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    ))}
    ;
  </div>
);

export default CourseList;
