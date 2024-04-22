let state = {
 isAdRunning: false,
 muted: false,
};
const adCheckingInterval = 500;
const videoPlaybackClassName = '.video-stream.html5-main-video';
const adPreviewIdentifier = '.ytp-preview-ad';
const adIdentifier = '.ytp-skip-ad';
const skipButtonIdentifier = '.ytp-skip-ad-button';

const checkForRunningAds = () => {
 //finding skip add elements in dom to know if a ad is running
 const button = document.querySelector(adIdentifier);
 const adPreview = document.querySelector(adPreviewIdentifier);
 let skipAdButton = document.querySelector(skipButtonIdentifier);
 if (skipAdButton) {
  skipAd(skipAdButton);
 } else if ((button || adPreview) && !state.isAdRunning) {
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
 } else if (state.isAdRunning) {
  //ad running checking if we can skip it
  console.log('Ad running');
  let skipAdButton = document.querySelector(skipButtonIdentifier);
  if (skipAdButton) {
   console.log('We can skip ad');
   skipAd(skipAdButton);
  }
 }
};

const skipAd = (skipAdButton) => {
 //hurray we can skip the ad
 skipAdButton.click();
 //verfying that we skipped the ad
 skipAdButton = document.querySelector(skipButtonIdentifier);
 if (!skipAdButton) {
  //we skipped the ad
  console.log('Skipped the ad');
  const videoPlayback = document.querySelector(videoPlaybackClassName);
  videoPlayback.muted = false;
  state.isAdRunning = false;
  state.muted = false;
  return;
 }
};

setInterval(checkForRunningAds, adCheckingInterval);
