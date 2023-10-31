import styles from "./Nav.module.css";
import { IoMenu } from "react-icons/io5";
import NavMenu from "../NavMenu/NavMenu";
import { useDispatch, useSelector } from "react-redux";
import { NavStateType, navOff, navOn } from "../../redux/redux";

export default function Nav(): JSX.Element {
  const navState = useSelector((state: NavStateType) => state.nav);
  const dispatch = useDispatch();
  const navHandle = () => {
    if (navState === false) dispatch(navOn());
    else dispatch(navOff());
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navClick}>
        <img
          src="https://res.cloudinary.com/hoyahoya/image/upload/v1698726480/hy/yefy1gnztcubhuzbixb5.png"
          onClick={navHandle}
        />
      </div>
      <NavMenu />
    </div>
  );
}
