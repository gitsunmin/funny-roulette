export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const deepCopy = (value) => JSON.parse(JSON.stringify(value));


export const rand = (start, end) => Math.floor((Math.random() * (end-start+1)) + start);

export const reload = () => {
  window.location.href = "index.html";
}
