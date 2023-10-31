import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/redux";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const queryClient = new QueryClient();
function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Nav />
        <Outlet />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
