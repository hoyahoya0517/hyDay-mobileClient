import styles from "./CalendarPage.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import { getHyDays, hyDay, hyEvent } from "../../api/calendar";
import Loading from "../../components/Loading/Loading";
import Plan from "../../components/Plan/Plan";
import { useState } from "react";
import moment from "moment";
import { EventInput } from "@fullcalendar/core";
import { useDispatch } from "react-redux";
import { NavStateType, navOff } from "../../redux/redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export default function CalendarPage(): JSX.Element {
  // const today = moment(new Date()).format("YYYY-MM-DD");
  useEffect(() => {
    dispatch(navOff());
  }, []);
  const dispatch = useDispatch();
  const navState = useSelector((state: NavStateType) => state.nav);
  useEffect(() => {
    if (navState) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [navState]);
  const [hyDay, setHyDay] = useState<hyDay>(null);
  const [clickDay, setClickDay] = useState<string>("");
  const [event, setEvent] = useState<EventInput[]>([]);

  const { isLoading, data } = useQuery(
    ["hyDays"],
    async () => {
      const hyDaysData = await getHyDays();
      return hyDaysData;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const eventData: hyEvent[] = [];
        data.forEach((day: hyDay) => {
          if (day === null) return;
          else {
            day.events.forEach((event: hyEvent) => {
              eventData.push(event);
            });
          }
        });
        eventData.push({ force: "kk" });
        setEvent(eventData);

        // const foundDay = data.find((day: hyDay) => {
        //   if (day === null) return false;
        //   else return day.date === today;
        // });
        // setHyDay(foundDay);
      },
    }
  );

  const handleSelect = (arg: any) => {
    const startDay = arg.startStr;
    const endDay = arg.endStr;
    const dayCha = moment(endDay).diff(startDay, "days");
    if (dayCha === 1) {
      setClickDay(startDay);
      const foundDay = data.find((day: hyDay) => {
        if (day === null) return false;
        else return day.date === startDay;
      });
      setHyDay(foundDay);
    } else {
      const fixEndDay = moment(endDay).subtract(1, "day").format("YYYY-MM-DD");
      const clickDays = startDay + "~" + fixEndDay;
      setClickDay(clickDays);
      const foundDay = data.find((day: hyDay) => {
        if (day === null) return false;
        else return day.date === clickDays;
      });
      setHyDay(foundDay);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className={styles.calendarPage}>
      <div className={styles.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          longPressDelay={300}
          weekends={true}
          headerToolbar={{
            start: "today",
            center: "title",
            end: "prev,next",
          }}
          selectable={true}
          dayMaxEventRows={true}
          select={handleSelect}
          // dateClick={handleDateClick}
          events={event}
          eventDisplay={"auto"}
          eventColor={"rgb(198, 91, 14)"}
          eventTextColor={"black"}
          eventOrder={"-id"}
          contentHeight={400}
        />
      </div>
      <Plan clickDay={clickDay} hyDay={hyDay} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
