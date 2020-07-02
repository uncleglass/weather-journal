/* Global Variables */
const getUrl = "/data";
const postUrl = "/add";
const key = "a1e90e76b253b0e1147e417519389148";
const apiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getFetch = async (url) => {
  const res = await fetch(url);
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const postFetch = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const updateUI = async () => {
  const data = await getFetch(getUrl);
  console.log("received data: ", data);
  const { date, temp, userResponse } = data;

  document.getElementById("date").innerText = date;
  document.getElementById("temp").innerText = temp;
  document.getElementById("content").innerText = userResponse;

  console.log("UI updated");
};

const process = async () => {
  const zipCode = document.getElementById("zip").value;
  const url = `${apiBaseUrl}${zipCode},pl&appid=${key}`;
  const apiRes = await getFetch(url);
  console.log("received from API: ", apiRes);

  const date = newDate;
  const { temp } = apiRes.main;
  const userResponse = document.getElementById("feelings").value;

  const dataToSend = { date, temp, userResponse };

  const postRes = await postFetch(postUrl, dataToSend);
  console.log("sent data: ", postRes);

  updateUI();
};

document.getElementById("generate").addEventListener("click", process);
