let Canvas = {};

Canvas.getStr = function (url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = () => {
      const canvas = document.createElement("canvas");
      Object.assign(canvas, { width: 150, height: 120 });
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.drawImage(image, 0, 0, 150, 120);
      Gray.getgray(ctx, 0, 0, 150, 120);
      const pixels = new Uint32Array(
        ctx.getImageData(0, 0, 150, 120).data.buffer
      );
      let res = "";
      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];
        res += Gray.getLuminanceToString(pixel);
        if ((i + 1) % 150 === 0) res += "<br />";
      }
      resolve(res);
    };
    image.src = url;
  });
};
