import { hyEvent } from "../../api/calendar";
import styles from "./Color.module.css";
import { TwitterPicker } from "react-color";

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
  const colorHandle = (color: any) => {
    const array = [...currentHyDayEvent];
    array[index].backgroundColor = color.hex;
    array[index].borderColor = color.hex;
    setCurrentHyDayEvent(array);
  };
  return (
    <div className={styles.colorWrap}>
      <div className={styles.color}>
        <TwitterPicker
          color={currentHyDayEvent[index].backgroundColor}
          onChangeComplete={colorHandle}
          width="276px"
          triangle="hide"
          colors={[
            "#C65B0E",
            "#FCB900",
            "#7BDCB5",
            "#00D084",
            "#8ED1FC",
            "#0693E3",
            "#ABB8C3",
            "#EB144C",
            "#F78DA7",
            "#9900EF",
          ]}
        />
      </div>
    </div>
  );
}
