const CourseList = ({ courses }) => (
  <div className="course-list">
    {Object.entries(courses).map(([id, info]) => (
      <div key={id}>
        {info.term} CS {info.number}: {info.title}
      </div>
    ))}
    ;
  </div>
);

export default CourseList;
