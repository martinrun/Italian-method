// YouTube Player API
let player;
let currentVideoId;

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    const videoIframe = document.getElementById('lesson-video');
    if (videoIframe) {
        currentVideoId = videoIframe.getAttribute('data-video-id');

        player = new YT.Player('lesson-video', {
            videoId: currentVideoId,
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'rel': 0,
                'showinfo': 0,
                'modestbranding': 1
            },
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady
            }
        });
    }
}

// Save video position when player state changes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PAUSED) {
        const currentTime = player.getCurrentTime();
        localStorage.setItem(`video_${currentVideoId}_position`, currentTime);
    }
}

// Restore video position when player is ready
function onPlayerReady(event) {
    const savedPosition = localStorage.getItem(`video_${currentVideoId}_position`);
    if (savedPosition) {
        player.seekTo(parseFloat(savedPosition));
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});