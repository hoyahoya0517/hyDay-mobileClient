import styles from "./NavMenu.module.css";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavStateType, navOff } from "../../redux/redux";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeName, removeToken } from "../../api/calendar";
import { useState, useEffect } from "react";
import { BsScissors } from "react-icons/bs";

export default function NavMenu(): JSX.Element {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const navigate = useNavigate();
  const navState = useSelector((state: NavStateType) => state.nav);
  const dispatch = useDispatch();
  const [userMenuOn, setUserMenuOn] = useState(false);
  const [nameChangeOn, setNameChangeOn] = useState(false);
  const [nameInput, setNameInput] = useState<string>("");
  const handleX = () => {
    dispatch(navOff());
  };
  const userMenuHandle = () => {
    if (userMenuOn) {
      setUserMenuOn(false);
    } else {
      setUserMenuOn(true);
      setNameChangeOn(false);
      setNameInput("");
    }
  };
  const nameChangeOnClick = () => {
    setNameChangeOn(true);
  };
  const nameChangeInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const nameChangeHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nameChangeMutate.mutate({ newname: nameInput });
  };
  const logoutHandle = () => {
    queryClient.setQueryData(["user"], null);
    removeToken();
  };
  const nameChangeMutate = useMutation({
    mutationFn: ({ newname }: { newname: string }) => changeName(newname),
    onSuccess(data) {
      queryClient.setQueryData(["user"], data);
    },
  });
  useEffect(() => {
    setUserMenuOn(false);
    setNameChangeOn(false);
  }, [user]);
  return (
    <div className={navState ? `${styles.navMenu}` : `${styles.navMenuHidden}`}>
      <div className={styles.x}>
        <BsX size={35} onClick={handleX} className={styles.xIcon} />
      </div>
      <div className={user ? `${styles.navLoginOn}` : `${styles.navLoginOff}`}>
        {user ? (
          <div className={styles.navLoginOk}>
            <div className={styles.navLoginOkWelcome} onClick={userMenuHandle}>
              WELCOME <span>{`${user}`}</span>
            </div>
            <div
              className={
                userMenuOn ? `${styles.userMenuOn}` : `${styles.userMenuOff}`
              }
            >
              {nameChangeOn ? (
                <form onSubmit={nameChangeHandle} className={styles.nameChange}>
                  <input
                    value={nameInput}
                    onChange={nameChangeInputHandle}
                    maxLength={6}
                  />
                  <div
                    onClick={() => {
                      nameChangeMutate.mutate({ newname: nameInput });
                    }}
                    className={styles.submitButton}
                  >
                    SUBMIT
                  </div>
                </form>
              ) : (
                <div
                  className={styles.nameChangeMenu}
                  onClick={nameChangeOnClick}
                >
                  NAME CHANGE
                </div>
              )}
              <div className={styles.logout} onClick={logoutHandle}>
                LOGOUT
              </div>
            </div>
          </div>
        ) : (
          <div
            className={styles.navLoginReady}
            onClick={() => {
              navigate("./login");
            }}
          >
            <BsPerson />
            LOGIN
          </div>
        )}
      </div>
      <div className={styles.navMenuCenter}>
        <div
          className={styles.home}
          onClick={() => {
            navigate("./");
          }}
        >
          HOME
        </div>
        <div
          className={styles.calendar}
          onClick={() => {
            navigate("./calendar");
          }}
        >
          CALENDAR
        </div>
        <div className={styles.wishlist}>WISHLIST</div>
        <div className={styles.adult}>19</div>
        <div className={styles.setting}>SETTING</div>
        <div
          className={styles.feedback}
          // onClick={() => {
          //   navigate("./feedback");
          // }}
        >
          FEEDBACK
        </div>
        <div className={styles.information}>INFORMATION</div>
      </div>
      <div className={styles.navMenuFooter}>
        <div className={styles.phone}>Contact</div>
        <div className={styles.infoBox}>
          am 11:00 - pm 18:00
          <br />
          lunch pm 12:00 - 13:00
          <br />
          Sat, Sun, Holiday OFF
        </div>
      </div>
    </div>
  );
}
