import { useEffect } from "react";
import { hyEvent } from "../../api/calendar";
import styles from "./Color.module.css";
import { SketchPicker } from "react-color";

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
    document.body.style.overflow = "unset";
  };
  const colorStopHandle = (e: any) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.colorWrap} onClick={colorModalHandle}>
      <div className={styles.color} onClick={colorStopHandle}>
        <SketchPicker
          color={currentHyDayEvent[index].backgroundColor}
          onChangeComplete={colorHandle}
          width="250px"
        />
      </div>
    </div>
  );
}
