import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Component/ProtectedRoute";
import Empty from "./Component/Empty/Empty";
import CreatePostPage from "./Pages/CreatePostPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          exact
          path="/"
          element={<ProtectedRoute Component={CreatePostPage} />}
        ></Route>
        <Route path="/*" element={<Empty />}></Route>
      </Routes>
    </>
  );
}

export default App;
