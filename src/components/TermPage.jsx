import { useState } from "react";
import CourseList from "./CourseList";
import "./TermPage.css";
import Modal from "./Modal";
import ChosenCourses from "./ChosenCourses";

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({ term, termSelection, setTermSelection }) => (
  <div>
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === termSelection}
      autoComplete="off"
      onChange={() => setTermSelection(term)}
    />
    <label
      className={
        term === termSelection
          ? "btn btn-success mb-1 p-2"
          : "btn btn-secondary mb-1 p-2"
      }
      htmlFor={term}
      style={{ width: "80px" }}
    >
      {term}
    </label>
  </div>
);

const TermSelector = ({ termSelection, setTermSelection }) => (
  <div className="btn-group" style={{ gap: 10, marginLeft: 220 }}>
    {terms.map((term) => (
      <TermButton
        key={term}
        term={term}
        termSelection={termSelection}
        setTermSelection={setTermSelection}
      />
    ))}
  </div>
);

const TermPage = ({ courseData }) => {
  const [termSelection, setTermSelection] = useState(terms[0]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [popUp, setPopUp] = useState(false);

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <div>
        <br />
        <TermSelector
          termSelection={termSelection}
          setTermSelection={setTermSelection}
        />
        <div style={{ float: "right", marginRight: 30 }}>
          <label className="btn btn-primary mb-1 p-2" onClick={openModal}>
            See Courses Selected
          </label>
        </div>
        <Modal open={open} close={closeModal}>
          <ChosenCourses selectedClasses={selectedClasses} />
        </Modal>
        <br /> <br />
        <div className="instructions">
          Click on a card to select or unselect the class <br /> <br />
        </div>
        <CourseList
          courses={courseData}
          term={termSelection}
          selectedClasses={selectedClasses}
          setSelectedClasses={setSelectedClasses}
        />
      </div>
    </div>
  );
};

export default TermPage;
