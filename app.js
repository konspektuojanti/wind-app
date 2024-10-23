// Variables
let video = document.getElementById('videoElement');
let asciiArtElement = document.getElementById('asciiArt');
let mediaRecorder;
let recordedChunks = [];

// ASCII characters for conversion
const asciiChars = "@#W$9876543210?!abc;:+=-,._ ";

// Capture webcam video
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;

    // Start converting frames to ASCII
    video.addEventListener('play', () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      function drawFrame() {
        if (video.paused || video.ended) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get frame data and convert to ASCII
        const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const asciiArt = imageToAscii(frameData);

        // Display ASCII art
        asciiArtElement.textContent = asciiArt;

        requestAnimationFrame(drawFrame);
      }

      requestAnimationFrame(drawFrame);

      // Start recording the ASCII art canvas
      document.getElementById('startBtn').addEventListener('click', () => {
        startRecording(canvas.captureStream());
      });

      document.getElementById('stopBtn').addEventListener('click', () => {
        stopRecording();
      });
    });
  })
  .catch(err => console.error('Error accessing camera:', err));

// Convert frame to ASCII art
function imageToAscii(frameData) {
  let asciiArt = '';
  for (let y = 0; y < frameData.height; y += 10) {  // Skip rows to make it ASCII-friendly
    for (let x = 0; x < frameData.width; x += 5) {  // Skip columns to fit ASCII aspect ratio
      const index = (y * frameData.width + x) * 4;
      const r = frameData.data[index];
      const g = frameData.data[index + 1];
      const b = frameData.data[index + 2];
      const brightness = (r + g + b) / 3;  // Grayscale

      // Map brightness to ASCII character
      const charIndex = Math.floor(brightness / 255 * (asciiChars.length - 1));
      asciiArt += asciiChars[charIndex];
    }
    asciiArt += '\n';  // Newline after each row
  }
  return asciiArt;
}

// Start recording the ASCII art video
function startRecording(stream) {
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'ascii-art-video.webm';
    downloadLink.style.display = 'block';  // Show download link
  };

  mediaRecorder.start();
  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;
}

// Stop recording
function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
  }
}
