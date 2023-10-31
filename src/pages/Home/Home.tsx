import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { BsSuitHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { navOff } from "../../redux/redux";
import { useEffect } from "react";

export default function Home(): JSX.Element {
  useEffect(() => {
    dispatch(navOff());
    document.body.style.overflow = "hidden";
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.home}>
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        whileHover={{
          scale: 1.2,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        }}
        className={styles.heart}
      >
        <BsSuitHeartFill
          size={80}
          style={{ color: "rgb(240, 0, 0)" }}
          onClick={() => {
            navigate("/calendar");
          }}
        />
      </motion.div>
    </div>
  );
}
