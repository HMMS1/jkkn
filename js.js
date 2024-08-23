let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let reset = document.querySelector('span');
let imgBox = document.querySelector('.img-box');

// Initialize default values
const defaultValues = {
    saturate: 100,
    contrast: 100,
    brightness: 100,
    sepia: 0,
    grayscale: 0,
    blur: 0,
    hueRotate: 0
};

window.onload = function() {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

upload.onchange = function() {
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() {
        img.src = file.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            resetValue(); // Reset filters when a new image is uploaded
        }
    }
}

function updateFilters() {
    img.style.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
    `;
    applyFiltersToCanvas();
}

function applyFiltersToCanvas() {
    // Draw the image on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // Apply filters
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height); // Redraw image on canvas with filters
    download.href = canvas.toDataURL(); // Set the download link to the canvas data URL
}

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', updateFilters);
});

function resetValue() {
    saturate.value = defaultValues.saturate;
    contrast.value = defaultValues.contrast;
    brightness.value = defaultValues.brightness;
    sepia.value = defaultValues.sepia;
    grayscale.value = defaultValues.grayscale;
    blur.value = defaultValues.blur;
    hueRotate.value = defaultValues.hueRotate;
    updateFilters();
}