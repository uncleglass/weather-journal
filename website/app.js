/* Global Variables */
const getUrl = "/data";
const postUrl = "/add";

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