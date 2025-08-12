const imageURL = "https://api.thecatapi.com/v1/images/search";
const imageContainer = document.querySelector(".imageWindow"); // This is the container

// Fetch a single cat image from API
async function getCatImage() {
    const response = await fetch(imageURL);
    return await response.json();
}

// Fill existing images
async function loadImages() {
    for (let image of imageContainer.children) {
        const data = await getCatImage();
        image.src = data[0].url;
    }
}

// Load new images and append
async function loadNewImages() {
    for (let i = 0; i < 10; i++) {
        const data = await getCatImage();
        const img = document.createElement("img");
        img.src = data[0].url;
        img.classList.add("image");
        imageContainer.appendChild(img);
    }
}

// Observer for infinite scroll
const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    loadNewImages().then(() => {
        observer.unobserve(entries[0].target);
        observer.observe(imageContainer.lastElementChild); // observe new last image
    });
}, {});

loadImages().then(() => {
    observer.observe(imageContainer.lastElementChild);
});
