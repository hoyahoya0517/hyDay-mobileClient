import styles from "./CreateFeedback.module.css";

export default function CreateFeedback({
  setCreateOn,
}: {
  setCreateOn: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <div className={styles.createFeedbackWrap}>
      <div className={styles.createFeedback}>f</div>
    </div>
  );
}
