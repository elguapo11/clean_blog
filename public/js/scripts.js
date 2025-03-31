document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll("div img");
    let modalImage = document.getElementById("modalImage");
    let modalTitle = document.getElementById("imageModalLabel"); // Get the modal title element

    let currentIndex = 0;

    function openModal(index) {
      currentIndex = index;
      updateModalImage();
      new bootstrap.Modal(document.getElementById("imageModal")).show();
    }

    function updateModalImage() {
        let currentImage = images[currentIndex];
        modalImage.src = currentImage.src;
        modalImage.alt = currentImage.alt;
        modalTitle.textContent = currentImage.alt;
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalImage();
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      updateModalImage();
    }

    // Attach click event to each image
    images.forEach((img, index) => {
      img.addEventListener("click", function () {
        openModal(index);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
          prevImage(); // Navigate to the previous image
      }
      if (event.key === "ArrowRight") {
          nextImage(); // Navigate to the next image
      }
  });

    // Expose functions to the global scope so they can be used in the modal
    window.prevImage = prevImage;
    window.nextImage = nextImage;
  });
