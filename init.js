let Init = {};

const strRes = [
  "这是我可爱的咪~也是我最爱的咪~有很多想给我的咪说的话~都写在了我的本本上~很想我的喵咪可以开开心心每一天~~~",
  "祝我的咪18岁生日快乐！！！",
];

Init.sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

Init.wait = () => {
  const releaseTime = new Date(2021, 11, 8, 0, 0, 0).getTime();
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeGap = releaseTime - now;
      if (timeGap <= 0) {
        clearInterval(timer);
        resolve();
        return;
      }
      // if (timeGap % 1000 === 0) {
      const day = parseInt(timeGap / (1000 * 60 * 60 * 24));
      const dayGap = timeGap - day * (1000 * 60 * 60 * 24);
      const hour = parseInt(dayGap / (1000 * 60 * 60));
      const hourGap = dayGap - hour * (1000 * 60 * 60);
      const min = parseInt(hourGap / (1000 * 60));
      const minGap = hourGap - min * (1000 * 60);
      const sec = parseInt(minGap / 1000);
      document.getElementById(
        "time"
      ).innerHTML = `${day}天 ${hour}小时 ${min}分 ${sec}秒`;
      // }
    }, 100);
  });
};

Init.showCommand = async () => {
  const str = "exec love my meow me --forever-everday";
  let res = "";
  for (let i = 0; i < str.length; i++) {
    res += str[i];
    document.getElementById("command").innerHTML = res;
    await Init.sleep(100);
  }
};

Init.showInfo = async (index, top, left, width, height) => {
  const str = strRes[index];
  const tipWrap = document.createElement("div");
  tipWrap.className = "tip";
  tipWrap.style.top = top + "px";
  tipWrap.style.left = left + "px";
  tipWrap.style.width = width + "px";
  tipWrap.style.height = height + "px";
  const tipWrap2 = document.createElement("div");
  tipWrap2.className = "tip-wrap";
  const tip = document.createElement("div");
  tip.className = "tip-text";
  tipWrap2.appendChild(tip);
  tipWrap.appendChild(tipWrap2);
  document.body.appendChild(tipWrap);
  await Init.sleep(0);
  tipWrap.className = "tip fadein";
  let res = "";
  for (let i = 0; i < str.length; i++) {
    res += str[i];
    tip.innerHTML = res;
    await Init.sleep(500);
  }
  await Init.sleep(2000);
};

Init.closeInfo = async () => {
  const tipWrap = document.getElementsByClassName("tip")[0];
  tipWrap.className = "tip fadeout";
  await Init.sleep(1000);
  const tipWrap2 = document.getElementsByClassName("tip-wrap")[0];
  const tip = document.getElementsByClassName("tip-text")[0];
  tipWrap2.removeChild(tip);
  tipWrap.removeChild(tipWrap2);
  document.body.removeChild(tipWrap);
};

Init.showPic = async () => {
  const url = "1.png";
  const str = await Canvas.getStr(url);

  const strArr = str.split("<br />");
  let res = "";
  for (let i = 0; i < strArr.length; i++) {
    res += strArr[i] + "<br />";
    document.getElementsByClassName("console")[0].innerHTML = res;
    document.documentElement.scrollTop =
      document.getElementsByClassName("console")[0].getBoundingClientRect()
        .top + document.documentElement.scrollHeight;
    await Init.sleep(100);
  }
};

Init.showPhoto = async (url, top, left, width, height, rotate = 0) => {
  const img = new Image(width, height);
  img.className = "img";
  img.style.top = top + "px";
  img.style.left = left + "px";
  img.style.transform = `rotate(${rotate}deg)`;
  img.onload = async () => {
    document.body.appendChild(img);
    await Init.sleep(100);
    img.className = "img fadein";
  };
  img.src = url;
};

Init.showDivBackgroundPhoto = async () => {
  const { width, height } = document
    .getElementsByClassName("console")[0]
    .getBoundingClientRect();
  const img = document.createElement("div");
  img.setAttribute("class", "img");
  img.style.top = 20 + "px";
  img.style.left = 0 + "px";
  img.style.width = width + "px";
  img.style.height = height + "px";
  img.style.background = "url(1.png) no-repeat";
  img.style.backgroundSize = "cover";
  document.body.appendChild(img);
};

Init.firstScene = async () => {
  document.getElementById("pre").style.display = "flex";
  document.getElementById("final").style.display = "none";
};

Init.secondScene = async () => {
  document.getElementById("pre").style.display = "none";
  document.getElementById("final").style.display = "block";
  setTimeout(() => {
    document.body.className = "fadein";
    document.getElementById("pre").className = "fadeout";
    document.getElementById("final").className = "fadein";
  }, 0);
};
