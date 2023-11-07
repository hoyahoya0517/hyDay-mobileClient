import { useEffect } from "react";
import { hyEvent } from "../../api/calendar";
import styles from "./Color.module.css";
import { ChromePicker } from "react-color";

export default function Color({
  colorModal,
  setColorModal,
  index,
  currentHyDayEvent,
  setCurrentHyDayEvent,
}: {
  colorModal: boolean;
  setColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  currentHyDayEvent: hyEvent[];
  setCurrentHyDayEvent: React.Dispatch<React.SetStateAction<hyEvent[]>>;
}): JSX.Element {
  useEffect(() => {
    if (colorModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [colorModal]);
  const colorHandle = (color: any) => {
    const array = [...currentHyDayEvent];
    array[index].backgroundColor = color.hex;
    array[index].borderColor = color.hex;
    setCurrentHyDayEvent(array);
  };
  const colorModalHandle = () => {
    setColorModal(false);
  };
  const colorStopHandle = (e: any) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.colorWrap} onClick={colorModalHandle}>
      <div className={styles.color} onClick={colorStopHandle}>
        <ChromePicker
          color={currentHyDayEvent[index].backgroundColor}
          onChangeComplete={colorHandle}
        />
      </div>
    </div>
  );
}
