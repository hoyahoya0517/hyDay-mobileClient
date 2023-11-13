import "./App.css";
import Nav from "./components/Nav/Nav";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { me } from "./api/calendar";

function App() {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(
    ["user"],
    async () => {
      const data = await me();
      return data;
    },
    {
      onSuccess() {
        console.log("autoLogin success");
      },
      onError() {
        console.log("autoLogin error");
        queryClient.setQueryData(["user"], null);
      },
      retry: 3,
    }
  );
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
