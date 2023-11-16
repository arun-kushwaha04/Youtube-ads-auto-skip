let state = {
 isAdRunning: false,
 muted: false,
};
const adCheckingInterval = 1000;
const videoPlaybackClassName = '.video-stream.html5-main-video';
const skipAdClassName = '.ytp-ad-preview-image-modern';
const skipButtonClassName = '.ytp-ad-skip-button-modern.ytp-button';

const checkForRunningAds = () => {
 //finding skip add elements in dom to know if a ad is running
 const button = document.querySelector(skipAdClassName);
 if (button && !state.isAdRunning) {
  console.log('Ad running, encountered first time');
  //ad running for the first time muting the ad
  const videoPlayback = document.querySelector(videoPlaybackClassName);
  if (!videoPlayback) {
   console.log('No video playback found');
   return;
  } else {
   state.isAdRunning = true;
   state.muted = true;
   videoPlayback.muted = true;
   const videoDuration = videoPlayback.duration;
   console.log('Video duration: ' + videoDuration);
   videoPlayback.currentTime = videoDuration;
   return;
  }
 } else if (button && state.isAdRunning) {
  //ad running checking if we can skip it
  console.log('Ad running');
  let skipAdButton = document.querySelector(skipButtonClassName);
  if (skipAdButton) {
   console.log('We can skip ad');
   //hurray we can skip the ad
   skipAdButton.click();
   //verfying that we skipped the ad
   skipAdButton = document.querySelector(skipButtonClassName);
   if (!skipAdButton) {
    //we skipped the ad
    console.log('Skipped the ad');
    const videoPlayback = document.querySelector(videoPlaybackClassName);
    videoPlayback.muted = false;
    state.isAdRunning = false;
    state.muted = false;
    return;
   }
  }
 } else {
  if (state.isAdRunning) {
   const videoPlayback = document.querySelector(videoPlaybackClassName);
   if (videoPlayback) videoPlayback.muted = false;
   state.isAdRunning = false;
   state.muted = false;
  }
 }
};

setInterval(checkForRunningAds, adCheckingInterval);
