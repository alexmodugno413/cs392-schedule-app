import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import TermPage from "./components/TermPage";
import Form from "./components/Form";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useJsonQuery } from "./utilities/fetch";

const queryClient = new QueryClient();

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

const Main = () => {
  const [data, isLoading, error] = useJsonQuery(
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  );
  const [selectedClasses, setSelectedClasses] = useState([]);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
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
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;
