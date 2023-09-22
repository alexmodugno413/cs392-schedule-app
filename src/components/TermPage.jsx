import { useState } from "react";
import CourseList from "./CourseList";
import "./TermPage.css";

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({ term, selection, setSelection }) => (
  <div>
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === selection}
      autoComplete="off"
      onChange={() => setSelection(term)}
    />
    <label
      className={
        term === selection
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

const TermSelector = ({ selection, setSelection }) => (
  <div className="btn-group" style={{ gap: 10 }}>
    {terms.map((term) => (
      <TermButton
        key={term}
        term={term}
        selection={selection}
        setSelection={setSelection}
      />
    ))}
  </div>
);

const TermPage = ({ courseData }) => {
  const [selection, setSelection] = useState(terms[0]);
  return (
    <div>
      <br />
      <TermSelector selection={selection} setSelection={setSelection} />
      <br /> <br />
      <div className="instructions">
        Click on a card to select or unselect the class <br /> <br />
      </div>
      <CourseList courses={courseData} term={selection} />
    </div>
  );
};

export default TermPage;
