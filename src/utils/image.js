export const resizeImage = (file, size = 256) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      // قصّ مربع من منتصف الصورة
      const side = Math.min(image.width, image.height);
      const sx = (image.width - side) / 2;
      const sy = (image.height - side) / 2;
      canvas.getContext('2d').drawImage(image, sx, sy, side, side, 0, 0, size, size);

      URL.revokeObjectURL(url); // تحرير الذاكرة
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Invalid image'));
    };

    image.src = url;
  });