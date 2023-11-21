import axios from "axios";
import moment from "moment";

export type hyEvent = {
  id?: string;
  title?: string;
  date?: string;
  start?: string;
  end?: string;
  force?: string;
  backgroundColor?: string;
  borderColor?: string;
};

export type hyDay = {
  date: string;
  events: hyEvent[];
  memo: string;
} | null;

export type feedback = {
  id: string;
  text: string;
  createdAt: string;
  code: string;
  username: string;
  comments: comment[];
};
export type comment = {
  id: string;
  parentId: string;
  text: string;
  createdAt: string;
  code: string;
  username: string;
};
export async function getHyDays() {
  const hydays = await axios.get(`${process.env.REACT_APP_BASEURL}/calendar`);
  return hydays.data;
}

export function createMemo(date: string, memo: string) {
  return axios.post(`${process.env.REACT_APP_BASEURL}/calendar/memo`, {
    date,
    memo,
  });
}

export function createEvent(date: string, events: hyEvent[]) {
  return axios.post(`${process.env.REACT_APP_BASEURL}/calendar/event`, {
    date,
    events,
  });
}

export function deleteDay(date: string) {
  return axios.delete(`${process.env.REACT_APP_BASEURL}/calendar/${date}`);
}

export async function login(code: string | undefined) {
  const data = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/login`, {
    code,
  });
  if (!data.data) return;
  const { username, token } = data.data;
  saveToken(token);
  return username;
}

export async function me() {
  const token = getToken();
  if (!token) return;
  const data = await axios.get(`${process.env.REACT_APP_BASEURL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!data) return;
  return data.data.username;
}

export async function meReturnCode() {
  const token = getToken();
  if (!token) return;
  const data = await axios.get(`${process.env.REACT_APP_BASEURL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!data) return;
  return data.data.code;
}

function saveToken(token: string) {
  localStorage.setItem("kitty_token", token);
}
function getToken() {
  return localStorage.getItem("kitty_token");
}
export function removeToken() {
  localStorage.removeItem("kitty_token");
}

export async function changeName(newname: string) {
  const token = getToken();
  if (!token) return;
  const data = await axios.post(
    `${process.env.REACT_APP_BASEURL}/auth/name`,
    { newname },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!data) return;
  return data.data.newUsername;
}

export async function getFeedback() {
  const feedback = await axios.get(`${process.env.REACT_APP_BASEURL}/feedback`);
  const data: feedback[] = feedback.data;
  data.sort((a, b) => {
    return (
      Number(moment(b.createdAt).format("YYYYMMDDHHmmss")) -
      Number(moment(a.createdAt).format("YYYYMMDDHHmmss"))
    );
  });
  return data;
}

export async function createFeedback(text: string) {
  const token = getToken();
  if (!token) return;
  return axios.post(
    `${process.env.REACT_APP_BASEURL}/feedback`,
    {
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function updateFeedback(text: string, id: string) {
  const token = getToken();
  if (!token) return;
  return axios.put(
    `${process.env.REACT_APP_BASEURL}/feedback/${id}`,
    {
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteFeedback(id: string) {
  const token = getToken();
  if (!token) return;
  return axios.delete(`${process.env.REACT_APP_BASEURL}/feedback/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createFeedbackComment(text: string, id: string) {
  const token = getToken();
  if (!token) return;
  return await axios.post(
    `${process.env.REACT_APP_BASEURL}/feedback/comment/${id}`,
    {
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteFeedbackComment(id: string, commentId: string) {
  const token = getToken();
  if (!token) return;
  return axios.delete(
    `${process.env.REACT_APP_BASEURL}/feedback/comment/${id}/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
