const ChosenCourses = ({ selectedClasses, allClasses }) => {
  console.log("selectedClasses", selectedClasses);
  console.log("allClasses", allClasses);

  const findCourse = (courseTitle) => {
    const course = Object.entries(allClasses).filter(
      ([id, info]) => `${info.term} CS ${info.number}` === courseTitle
    );
    return course;
  };

  const formattedSelectedClasses = selectedClasses.map(findCourse);
  console.log("formattedSelectedClasses", formattedSelectedClasses);

  formattedSelectedClasses.map((id) => {
    console.log("info new", id[0][1]);
  });

  let formattedClasses = [];
  formattedSelectedClasses.map((id) => {
    formattedClasses.push(id[0][1]);
  });
  console.log("formattedClasses", formattedClasses);

  return (
    <div className="cart">
      {selectedClasses.length === 0 ? (
        <h2>Click on a card to select a class</h2>
      ) : (
        <div>
          Selected classes:
          {formattedClasses.map((course) => (
            <div>
              {course.term} CS {course.number}: {course.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChosenCourses;
