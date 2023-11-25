document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('thermalCanvas');
    const context = canvas.getContext('2d');
  
    function generateRandomTemperature() {
      return Math.random() * 100; // Adjust the range based on your preferences
    }
  
    function getColor(temperature) {
      const blue = Math.min(255, Math.round(255 * (1 - temperature / 100)));
      const red = Math.min(255, Math.round(255 * (temperature / 100)));
      const green = 0;
  
      return `rgb(${red}, ${green}, ${blue})`;
    }
  
    function updateCanvas() {
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const temperature = generateRandomTemperature();
          const color = getColor(temperature);
  
          context.fillStyle = color;
          context.fillRect(x, y, 1, 1);
        }
      }
    }
  
    setInterval(updateCanvas, 1000);
  });
  