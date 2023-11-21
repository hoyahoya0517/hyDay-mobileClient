import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./Feedback.module.css";
import { feedback, getFeedback, me } from "../../api/calendar";
import Loading from "../../components/Loading/Loading";
import FeedbackCard from "../../components/FeedbackCard/FeedbackCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavStateType, navOff } from "../../redux/redux";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CreateFeedback from "../../components/CreateFeedback/CreateFeedback";
import { ToastContainer } from "react-toastify";

export default function Feedback(): JSX.Element {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(
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
      retry: 1,
    }
  );
  useEffect(() => {
    dispatch(navOff());
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOn, setCreateOn] = useState<boolean>(false);
  const navState = useSelector((state: NavStateType) => state.nav);
  useEffect(() => {
    if (navState) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [navState]);
  const upScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (createOn) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [createOn]);
  const { isLoading, data: feedbacks } = useQuery(["feedback"], async () => {
    const feedback = await getFeedback();
    return feedback;
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <div className={styles.feedback}>
        <div className={styles.feedbackNav}>
          <div className={styles.user}>
            {user ? (
              user
            ) : (
              <div
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOGIN
              </div>
            )}
          </div>
          <div className={styles.logo}>
            <span onClick={upScroll}>DanDan</span>
          </div>
          <div
            onClick={() => {
              setCreateOn(true);
            }}
            className={styles.create}
          >
            <BsFileEarmarkPlus size={20} />
          </div>
        </div>
        <div className={styles.feedbackMain}>
          {feedbacks?.map((feedback: feedback) => {
            return <FeedbackCard key={feedback.id} feedback={feedback} />;
          })}
        </div>
      </div>
      {createOn && <CreateFeedback setCreateOn={setCreateOn} />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
