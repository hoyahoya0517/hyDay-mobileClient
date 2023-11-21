import moment from "moment";
import {
  comment,
  deleteFeedbackComment,
  meReturnCode,
} from "../../api/calendar";
import styles from "./CommentCard.module.css";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { BsXLg } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function CommentCard({
  comment,
}: {
  comment: comment;
}): JSX.Element {
  const queryClient = useQueryClient();
  const timeChange = (date: string) => {
    return moment(date).fromNow();
  };
  const [dotMenuOn, setDotMenuOn] = useState<boolean>(false);
  const dotMenuHandle = () => {
    setDotMenuOn((prev) => !prev);
  };
  const deleteFeedbackCommentMutate = useMutation({
    mutationFn: ({ id, commentId }: { id: string; commentId: string }) =>
      deleteFeedbackComment(id, commentId),
    onSuccess() {
      queryClient.invalidateQueries(["feedback"]);
      toastNotifySuccess();
    },
  });
  const handleCommentDelete = () => {
    Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네!",
      cancelButtonText: "아니요..",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const code = await meReturnCode();
        if (code !== comment.code) return toastNotifyError();
        const id = comment.parentId;
        const commentId = comment.id;
        deleteFeedbackCommentMutate.mutate({ id, commentId });
      }
    });
  };
  const toastNotifyError = () => {
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
    toast.success("댓글 삭제 완료", {
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
  return (
    <div className={styles.comment}>
      <div className={styles.comment_top}>
        <div className={styles.comment_top_username}>{comment.username}</div>
        <div className={styles.comment_top_time}>
          {timeChange(comment.createdAt)}
        </div>
      </div>
      <div className={styles.comment_center}>
        <div className={styles.comment_center_text}>{comment.text}</div>
      </div>
      <div className={styles.dotMenu}>
        <GoKebabHorizontal onClick={dotMenuHandle} size={17} />
        {dotMenuOn && (
          <div className={styles.dotMenuMain}>
            <BsXLg onClick={handleCommentDelete} />
          </div>
        )}
      </div>
    </div>
  );
}
