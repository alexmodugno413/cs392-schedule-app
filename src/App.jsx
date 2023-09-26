import { useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import "bootstrap/dist/css/bootstrap.css";
import TermPage from "./components/TermPage";
import Form from "./components/Form";

import { useDbData } from "./utilities/firebase";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

const Main = () => {
  const [data, error] = useDbData("/");
  const [selectedClasses, setSelectedClasses] = useState([]);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Banner title={data.title} />
              <Outlet />
            </div>
          }
        >
          <Route
            index
            element={
              <TermPage
                courseData={data.courses}
                selectedClasses={selectedClasses}
                setSelectedClasses={setSelectedClasses}
              />
            }
          />
        </Route>
        <Route
          path="courses/:courseId"
          element={<Form selectedClasses={selectedClasses} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <div className="App">
      <Main />
    </div>
  );
};

export default App;
