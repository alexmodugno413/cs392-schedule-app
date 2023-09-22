import "./ChosenCourses.css";

const ChosenCourses = ({ selectedClasses, allClasses }) => {
  let formattedClasses = [];
  selectedClasses.map(([term, title, number, meets]) => {
    formattedClasses.push({
      term: term,
      title: title,
      number: number,
      meets: meets,
    });
  });

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
            {formattedClasses.map((course) => (
              <div key={course} className={`class-info`}>
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
