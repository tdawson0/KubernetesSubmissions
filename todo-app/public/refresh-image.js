const timestampPath = '/timestamp';
const CHECK_INTERVAL = 10000; // 10 seconds

const refreshImage = (timestamp) => {
    const img = document.getElementById('todo-image');

    // Fade out
    img.classList.add('fade-out');

    // After fade-out completes, change the image
    setTimeout(() => {
        img.src = img.src.split('?')[0] + '?' + timestamp;

        // Fade back in
        img.classList.remove('fade-out');
    }, 1000); // match CSS transition duration
};


const checkForUpdate = async () => {
  console.log('Checking for image update...');
    try {
        const response = await fetch(timestampPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch image timestamp: ${response.statusText}`);
        }
        const serverTimestamp = await response.text();
        const localTimestamp = localStorage.getItem('imageTimestamp');
        if (localTimestamp !== serverTimestamp) {
            console.log('New image available, refreshing...');
            refreshImage(serverTimestamp);
            localStorage.setItem('imageTimestamp', serverTimestamp);
        } else {
            console.log('Image is up to date');
        }
    } catch (error) {
        console.error('Error checking for image update:', error);
    }
};
setInterval(checkForUpdate, CHECK_INTERVAL);