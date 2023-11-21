import styles from "./CreateFeedback.module.css";
import { BsXLg } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeedback, me } from "../../api/calendar";
import { toast } from "react-toastify";

export default function CreateFeedback({
  setCreateOn,
}: {
  setCreateOn: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const queryClient = useQueryClient();
  const [input, setInput] = useState<string>("");
  const createFeedbackMutate = useMutation({
    mutationFn: ({ text }: { text: string }) => createFeedback(text),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      setInput("");
      setCreateOn(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });
  const handleCheck = async () => {
    const text = input;
    if (text.trim().length === 0) return toastNotifyError1();
    const username = await me();
    if (!username) return toastNotifyError2();
    createFeedbackMutate.mutate({ text });
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
    toast.warn("로그인이 필요합니다", {
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
  const setCreateOnFalse = () => {
    setCreateOn(false);
  };
  const inputFocus = useRef<HTMLTextAreaElement>(null);
  const stopPropagationHandle = (e: any) => {
    e.stopPropagation();
  };
  useEffect(() => {
    if (inputFocus.current) inputFocus.current.focus();
  }, []);
  return (
    <div className={styles.createFeedbackWrap} onClick={setCreateOnFalse}>
      <div onClick={stopPropagationHandle} className={styles.createFeedback}>
        <div className={styles.top}>
          <BsXLg
            onClick={setCreateOnFalse}
            size={17}
            style={{ color: "rgb(198, 91, 14)" }}
          />
        </div>
        <div className={styles.main}>
          <textarea
            value={input}
            onChange={(ev) => {
              setInput(ev.target.value);
            }}
            ref={inputFocus}
            spellCheck={false}
          />
        </div>
        <div className={styles.bottom}>
          <p onClick={handleCheck}>DanDan</p>
        </div>
      </div>
    </div>
  );
}
