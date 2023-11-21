import moment from "moment";
import {
  comment,
  createFeedbackComment,
  deleteFeedback,
  feedback,
  me,
  meReturnCode,
  updateFeedback,
} from "../../api/calendar";
import styles from "./FeedbackCard.module.css";
import { GoComment, GoPencil, GoChecklist, GoTrash } from "react-icons/go";
import { KeyboardEvent, useState, useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import CommentCard from "../CommentCard/CommentCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function FeedbackCard({
  feedback,
}: {
  feedback: feedback;
}): JSX.Element {
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState<string>("");
  const handleCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };
  const updateFeedbackMutate = useMutation({
    mutationFn: ({ text, id }: { text: string; id: string }) =>
      updateFeedback(text, id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      setUpdateOn(false);
      setCommentOn(false);
      toastNotifySuccess();
    },
  });
  const deleteFeedbackMutate = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteFeedback(id),
    onSuccess() {
      queryClient.invalidateQueries(["feedback"]);
      toastNotifyDelSuccess();
    },
  });
  const handleUpdate = async () => {
    const text = updateInput;
    if (text.trim().length === 0) return toastNotifyError1();
    const code = await meReturnCode();
    if (code !== feedback.code) return toastNotifyError2();
    const id = feedback.id;
    updateFeedbackMutate.mutate({ text, id });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제하면 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네!",
      cancelButtonText: "아니요!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const code = await meReturnCode();
        if (code !== feedback.code) return toastNotifyError2();
        const id = feedback.id;
        deleteFeedbackMutate.mutate({ id });
      }
    });
  };
  const createFeedbackCommentMutate = useMutation({
    mutationFn: ({ text, id }: { text: string; id: string }) =>
      createFeedbackComment(text, id),
    onSuccess(data) {
      queryClient.invalidateQueries(["feedback"]);
    },
  });
  const handleCommentForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = commentInput;
    if (text.trim().length === 0) return toastNotifyCommentError1();
    const username = await me();
    if (!username) return toastNotifyCommentError2();
    const id = feedback.id;
    createFeedbackCommentMutate.mutate({ text, id });
  };
  const toastNotifyError1 = () => {
    toast.error("글을 입력하세요", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const toastNotifyError2 = () => {
    toast.warn("권한이 없습니다", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const toastNotifySuccess = () => {
    toast.success("업데이트 완료", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const toastNotifyDelSuccess = () => {
    toast.info("삭제 완료", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const toastNotifyCommentError1 = () => {
    toast.error("댓글을 입력하세요", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const toastNotifyCommentError2 = () => {
    toast.warn("로그인을 하세요", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [updateOn, setUpdateOn] = useState<boolean>(false);
  const [updateInput, setUpdateInput] = useState(feedback.text);
  const [commentOn, setCommentOn] = useState<boolean>(false);
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
                autoFocus
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
            style={{
              color: commentOn ? "rgb(198, 91, 14)" : "rgba(61, 61, 61, 0.7)",
            }}
          />
          <GoPencil
            onClick={updateOnHandle}
            size={21}
            style={{
              color: updateOn ? "rgb(198, 91, 14)" : "rgba(61, 61, 61, 0.7)",
            }}
          />
          <GoChecklist
            onClick={handleUpdate}
            size={21}
            style={{ color: "rgba(61, 61, 61, 0.7)" }}
          />
          <GoTrash
            onClick={handleDelete}
            size={21}
            style={{ color: "rgba(61, 61, 61, 0.7)" }}
          />
        </div>
        <div className={styles.card_comment}>
          {commentOn &&
            feedback.comments &&
            feedback.comments.map((comment: comment) => {
              return <CommentCard comment={comment} key={comment.id} />;
            })}
          {commentOn && (
            <form onSubmit={handleCommentForm} className={styles.commentInput}>
              <div className={styles.commentInputIcon}>
                <GoComment
                  size={21}
                  style={{ color: "rgba(61, 61, 61, 0.7)" }}
                />
              </div>
              <div className={styles.commentInputInput}>
                <input onChange={handleCommentInput} value={commentInput} />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
