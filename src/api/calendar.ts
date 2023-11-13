import axios from "axios";

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

function saveToken(token: string) {
  localStorage.setItem("kitty_token", token);
}
function getToken() {
  return localStorage.getItem("kitty_token");
}
export function removeToken() {
  localStorage.removeItem("kitty_token");
}
