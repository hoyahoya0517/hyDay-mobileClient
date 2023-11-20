import moment from "moment";
import { comment } from "../../api/calendar";
import styles from "./CommentCard.module.css";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

export default function CommentCard({
  comment,
}: {
  comment: comment;
}): JSX.Element {
  const timeChange = (date: string) => {
    return moment(date).fromNow();
  };
  const [updateOn, setUpdateOn] = useState<boolean>(false);
  const [updateInput, setUpdateInput] = useState(comment.text);
  return (
    <div className={styles.comment}>
      <div className={styles.comment_top}>
        <div className={styles.comment_top_username}>{comment.username}</div>
        <div className={styles.comment_top_time}>
          {timeChange(comment.createdAt)}
        </div>
      </div>
      <div className={styles.comment_center}>
        <div className={styles.comment_center_text}>
          {updateOn ? <div></div> : comment.text}
        </div>
      </div>
      <div className={styles.dotMenu}>
        <GoKebabHorizontal size={17} />
      </div>
    </div>
  );
}
