// YouTube Player API
let player;
let currentVideoId;

// Make the callback function available globally
window.onYouTubeIframeAPIReady = function() {
    const videoIframe = document.getElementById('lesson-video');
    if (videoIframe) {
        currentVideoId = videoIframe.getAttribute('data-video-id');
        console.log('Initializing player with video ID:', currentVideoId);

        player = new YT.Player('lesson-video', {
            videoId: currentVideoId,
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'rel': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'enablejsapi': 1,
                'origin': window.location.origin
            },
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady,
                'onError': onPlayerError
            }
        });
    } else {
        console.error('Video iframe not found');
    }
};

// Save video position when player state changes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PAUSED) {
        const currentTime = player.getCurrentTime();
        localStorage.setItem(`video_${currentVideoId}_position`, currentTime);
    }
}

// Restore video position when player is ready
function onPlayerReady(event) {
    console.log('Player is ready');
    const savedPosition = localStorage.getItem(`video_${currentVideoId}_position`);
    if (savedPosition) {
        player.seekTo(parseFloat(savedPosition));
    }
    // Ensure video is paused on load
    player.pauseVideo();
}

// Handle player errors
function onPlayerError(event) {
    console.error('Player error:', event.data);
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for YouTube API');
    // Check if YouTube API is already loaded
    if (window.YT && window.YT.Player) {
        console.log('YouTube API already loaded');
        window.onYouTubeIframeAPIReady();
    } else {
        console.log('Loading YouTube API');
        // Load YouTube API
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
});