let Gray = {};

Gray.getgray = function (context, sx, sy, sw, sh) {
  const imageData = context.getImageData(sx, sy, sw, sh);
  const colorDataArr = imageData.data;
  const colorDataArrLen = colorDataArr.length;
  for (let i = 0; i < colorDataArrLen; i += 4) {
    // 计算方式之一
    const gray =
      (colorDataArr[i] + colorDataArr[i + 1] + colorDataArr[i + 2]) / 3;
    colorDataArr[i] = gray;
    colorDataArr[i + 1] = gray;
    colorDataArr[i + 2] = gray;
  }
  context.putImageData(imageData, 0, 0);
};

Gray.getLuminanceToString = function (intValue) {
  if (intValue === 0) return " ";
  const r = intValue & 0xff;
  const g = (intValue >> 8) & 0xff;
  const b = (intValue >> 16) & 0xff;
  const a = (((intValue >> 24) >>> 0) & 0xff) / 255;
  const color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
  const l = tinycolor(color).getLuminance();
  switch (l.toFixed(1)) {
    case "1.0":
      return " ";
    case "0.9":
      return "a";
    case "0.8":
      return "y";
    case "0.7":
      return "e";
    case "0.6":
      return "w";
    case "0.5":
      return "m";
    case "0.4":
      return "A";
    case "0.3":
      return "Y";
    case "0.2":
      return "E";
    case "0.1":
      return "w";
    case "0.0":
      return "M";
    default:
      return "O";
  }
};
