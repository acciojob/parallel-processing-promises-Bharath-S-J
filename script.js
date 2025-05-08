// DOM Elements
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// Image URLs to download
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image
function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => resolve(img); // If image loads successfully, resolve the promise
    img.onerror = () => reject(`Failed to load image: ${imageUrl}`); // If error, reject the promise
  });
}

// Main function to download all images
async function downloadImages() {
  // Show loading spinner
  loading.style.display = "block";
  output.innerHTML = ""; // Clear any previous output
  errorDiv.innerHTML = ""; // Clear previous errors

  try {
    // Map over images array and download all images in parallel
    const imagePromises = images.map(image => downloadImage(image.url));
    
    // Wait for all promises to resolve with Promise.all
    const downloadedImages = await Promise.all(imagePromises);

    // Hide loading spinner once images are downloaded
    loading.style.display = "none";

    // Display images inside the #output div
    downloadedImages.forEach(img => {
      output.appendChild(img);
    });
  } catch (error) {
    // Hide loading spinner on error
    loading.style.display = "none";
    // Display error message inside the #error div
    errorDiv.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
  }
}

// Trigger the download process when button is clicked
document.getElementById("download-images-button").addEventListener("click", downloadImages);
