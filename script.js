document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('thermalCamera');
    const canvas = document.getElementById('thermalCanvas');
    const context = canvas.getContext('2d');
  
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.error('Error accessing the camera:', error);
      });
  
    function updateCanvas() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      // Get the image data from the canvas
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      // Apply thermal imaging processing to the image data
      for (let i = 0; i < data.length; i += 4) {
        const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
  
        // Map grayscale to a color gradient (example: blue to red)
        const blue = Math.min(255, Math.round(255 * (1 - grayscale / 255)));
        const red = Math.min(255, Math.round(255 * (grayscale / 255)));
        const green = 0;
  
        // Set the new color values
        data[i] = red;
        data[i + 1] = green;
        data[i + 2] = blue;
      }
  
      // Put the modified image data back onto the canvas
      context.putImageData(imageData, 0, 0);
    }
  
    setInterval(updateCanvas, 1000);
  });
  