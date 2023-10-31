import styles from "./Loading.module.css";
import { GiMushroom } from "react-icons/gi";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home(): JSX.Element {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className={styles.loading}>
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={styles.mush}
      >
        <GiMushroom size={80} style={{ color: "rgb(0, 128, 0)" }} />
      </motion.div>
    </div>
  );
}
