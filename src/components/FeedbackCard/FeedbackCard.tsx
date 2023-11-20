import moment from "moment";
import { comment, feedback } from "../../api/calendar";
import styles from "./FeedbackCard.module.css";
import { GoComment, GoPencil, GoChecklist, GoTrash } from "react-icons/go";
import { KeyboardEvent, useState, useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import CommentCard from "../CommentCard/CommentCard";

export default function FeedbackCard({
  feedback,
}: {
  feedback: feedback;
}): JSX.Element {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [updateOn, setUpdateOn] = useState<boolean>(false);
  const [updateInput, setUpdateInput] = useState(feedback.text);
  const [commentOn, setCommentOn] = useState<boolean>(false);
  const [createOn, setCreateOn] = useState<boolean>(false);
  const timeChange = (date: string) => {
    return moment(date).fromNow();
  };
  const updateOnHandle = () => {
    setUpdateOn((prev) => !prev);
  };
  const commenOnHandle = () => {
    setCommentOn((prev) => !prev);
  };
  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (scrollRef.current)
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={styles.feedbackCard}>
      <div className={styles.feedbackCardWrap}>
        <div className={styles.card_top}>
          <div className={styles.card_top_username}>{feedback.username}</div>
          <div className={styles.card_top_time}>
            {timeChange(feedback.createdAt)}
          </div>
        </div>
        <div className={styles.card_center}>
          <div className={styles.card_center_text}>
            {updateOn ? (
              <ReactTextareaAutosize
                className={styles.feedbackTextarea}
                spellCheck={false}
                onKeyDown={handleEnter}
                value={updateInput}
                onChange={(ev) => setUpdateInput(ev.target.value)}
              />
            ) : (
              feedback.text
            )}
          </div>
        </div>
        <div ref={scrollRef} className={styles.card_bottom}>
          <GoComment
            onClick={commenOnHandle}
            size={21}
            style={{ color: "rgba(61, 61, 61, 0.7)" }}
          />
          <GoPencil
            onClick={updateOnHandle}
            size={21}
            style={{ color: "rgba(61, 61, 61, 0.7)" }}
          />
          <GoChecklist size={21} style={{ color: "rgba(61, 61, 61, 0.7)" }} />
          <GoTrash size={21} style={{ color: "rgba(61, 61, 61, 0.7)" }} />
        </div>
        <div className={styles.card_comment}>
          {commentOn &&
            feedback.comments &&
            feedback.comments.map((comment: comment) => {
              return <CommentCard comment={comment} key={comment.id} />;
            })}
        </div>
      </div>
    </div>
  );
}
