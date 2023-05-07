let currentImageIndex = 0;
const images = ["image/poster1.jpg", "image/poster2.jpg", "image/poster3.jpg", "image/poster4.jpg", "image/poster5.jpg"];

function nextImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  document.getElementById("myImage").src = images[currentImageIndex];
}

function prevImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  document.getElementById("myImage").src = images[currentImageIndex];
}
