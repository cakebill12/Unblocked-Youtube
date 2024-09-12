const apiKey = 'AIzaSyBKxUxnXcmqP_cMj0gZeX_KqE9khTekdUE';

// Function to perform search and display results
async function performSearch() {
    const query = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    const videos = await searchYouTube(query);

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.high.url;

        // Create a div to hold video details
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        // Add video thumbnail and title
        videoItem.innerHTML = `
            <img src="${videoThumbnail}" alt="${videoTitle}" />
            <h3>${videoTitle}</h3>
        `;

        // Add click event to play video
        videoItem.addEventListener('click', () => {
            playVideo(videoId);
        });

        resultsDiv.appendChild(videoItem);
    });
}

// Function to fetch videos from YouTube API
async function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items; // Return array of video objects
}

// Function to play the selected video
function playVideo(videoId) {
    const player = document.getElementById('youtube-player');
    const videoPlayer = document.getElementById('video-player');
    player.src = `https://www.youtube.com/embed/${videoId}`;
    videoPlayer.style.display = 'flex';
}
