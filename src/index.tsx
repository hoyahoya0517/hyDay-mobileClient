import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CalendarPage from "./pages/Calendar/CalendarPage";
import Feedback from "./pages/Feedback/Feedback";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />}>
        <Route index element={<Home />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
