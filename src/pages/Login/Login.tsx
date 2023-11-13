import React from "react";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { navOff } from "../../redux/redux";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, me } from "../../api/calendar";
import { useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(
    ["user"],
    async () => {
      const data = await me();
      return data;
    },
    {
      onSuccess() {
        console.log("autoLogin success");
      },
      onError() {
        console.log("autoLogin error");
        queryClient.setQueryData(["user"], null);
      },
      retry: 1,
    }
  );
  const loginMutate = useMutation({
    mutationFn: ({ code }: { code: string | undefined }) => login(code),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(-1);
    },
  });
  const [inputOn, setInputOn] = useState<boolean>(false);
  const [code, setCode] = useState<string>();
  useEffect(() => {
    dispatch(navOff());
    document.body.style.overflow = "hidden";
  }, []);
  const dispatch = useDispatch();
  const kittyHandle = () => {
    if (inputOn) setInputOn(false);
    else setInputOn(true);
  };
  const codeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputOn(false);
    setCode(undefined);
    loginMutate.mutate({ code });
  };
  if (data) navigate(-1);
  return (
    <div className={styles.login}>
      <video
        onClick={kittyHandle}
        autoPlay
        muted
        loop
        playsInline
        className={styles.loginVideo}
      >
        <source src="https://res.cloudinary.com/hoyahoya/video/upload/v1699448014/hy/videoplayback_cut_1_hotwwi.mp4"></source>
      </video>
      <form
        onSubmit={submitHandle}
        className={inputOn ? `${styles.kittyOn}` : `${styles.kittyOff}`}
      >
        <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1699445908/hy/pngwing.com_4_ndqhxj.png" />
        {inputOn && (
          <div className={styles.kittyInput}>
            <input value={code} onChange={codeHandle} maxLength={4} />
          </div>
        )}
      </form>
    </div>
  );
}
