import "./ChosenCourses.css";

const ChosenCourses = ({ selectedClasses, allClasses }) => {
  const findCourse = (courseTitle) => {
    const course = Object.entries(allClasses).filter(
      ([id, info]) => `${info.term} CS ${info.number}` === courseTitle
    );
    return course;
  };

  const formattedSelectedClasses = selectedClasses.map(findCourse);

  let formattedClasses = [];
  formattedSelectedClasses.map((id) => {
    formattedClasses.push(id[0][1]);
  });
  console.log("formattedClasses", formattedClasses);

  return (
    <div>
      {selectedClasses.length === 0 ? (
        <div>
          <h2>No courses selected</h2>
          <h3>Click on a card to select a class</h3>
        </div>
      ) : (
        <div>
          <h2>Selected classes:</h2>
          <div>
            {formattedClasses.map((course, index) => (
              <div key={index} className={`class-info class-${index + 1}`}>
                <div className="class-term">{course.term}</div>
                <div className="class-details">
                  <span className="class-number">CS {course.number}:</span>
                  <span className="class-title">{course.title}</span>
                  <span className="class-meets">{course.meets}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChosenCourses;
