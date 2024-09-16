const apiKey = 'AIzaSyBKxUxnXcmqP_cMj0gZeX_KqE9khTekdUE';
let nextPageToken = '';
let prevPageToken = '';
let query = '';

async function performSearch(pageToken = '') {
    query = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    const videos = await searchYouTube(query, pageToken);

    videos.items.forEach(video => {
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

    // Update pagination tokens
    nextPageToken = videos.nextPageToken || '';
    prevPageToken = videos.prevPageToken || '';

    // Enable/disable the buttons based on available tokens
    document.getElementById('next-button').disabled = !nextPageToken;
    document.getElementById('prev-button').disabled = !prevPageToken;
}

// Function to fetch videos from YouTube API
async function searchYouTube(query, pageToken = '') {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=30&pageToken=${pageToken}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data; // Return full response including items and tokens
}

// Function to play the selected video
function playVideo(videoId) {
    const player = document.getElementById('youtube-player');
    const videoPlayer = document.getElementById('video-player');
    player.src = `https://www.youtube.com/embed/${videoId}`;
    videoPlayer.style.display = 'flex';
    
    // Scroll to video player
    videoPlayer.scrollIntoView({ behavior: 'smooth' });
}

// Navigate to the next page of results
function nextPage() {
    if (nextPageToken) {
        performSearch(nextPageToken);
    }
}

// Navigate to the previous page of results
function prevPage() {
    if (prevPageToken) {
        performSearch(prevPageToken);
    }
}
