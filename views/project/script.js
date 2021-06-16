// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let projectIds = [];
let projects = [];
var videoId;
let currentProject;
const url = window.location.href;
const appURL = process.env.url;
function onYouTubeIframeAPIReady() {
    (async () => {
        const response = await fetch('http://localhost:3000/data')
        const json = await response.json();
        json.forEach(project => {
            projects.push(project)
            projectIds.push(project._id)
        });
        for (let i = 0; i < projectIds.length; i++) {
            if (url == ("http://localhost:3000/projects/").concat(projectIds[i])) { // change this line to reflect the new url before deploying
                console.log("hi")
                console.log(url)
                //console.log(projectIds[i])
                currentProject = projectIds[i]
                //let found = projects.find(currentProject => currentProject);
                console.log(currentProject)
            }
        }
        let found = projects.find((project) => {
            if(project._id == currentProject) {
                videoId = project.videoTitle;
            }
        });
        console.log(videoId)
        console.log(appURL)
    })();
    // fetch('http://localhost:3000/data')
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch((error) => {
    //     console.log(error)
    // })
    player = new YT.Player('player', {
    height: '270',
    width: '480',
    playerVars: {
        'playsinline': 1
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    player.loadVideoById(videoId);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}