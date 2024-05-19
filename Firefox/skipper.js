let state = {
 isAdRunning: false,
 muted: false,
};
const adCheckingInterval = 500;
const videoPlaybackClassName = '.video-stream.html5-main-video';
// const adPreviewIdentifier =
//  '.ytp-ad-preview-container.ytp-ad-preview-container-detached';
// const adIdentifier = '.ytp-preview-ad';
const skipButtonIdentifier = ['.ytp-skip-ad-button'];
const adsDivIdentifier = ['.ytp-skip-ad'];

const checkForRunningAds = () => {
 //finding skip add elements in dom to know if a ad is running
 //  const button = document.querySelector(adIdentifier);
 //  const adPreview = document.querySelector(adPreviewIdentifier);
 let skipAdButton = null;

 let adsDiv = null;
 adsDivIdentifier.forEach((className) => {
  let element = document.querySelector(className);
  if (element) adsDiv = element;
 });

 skipButtonIdentifier.forEach((className) => {
  let element = document.querySelector(className);
  if (element) skipAdButton = element;
 });

 if (skipAdButton) {
  skipAd(skipAdButton);
 } else if (adsDiv && !state.isAdRunning) {
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
  state.isAdRunning = true;
  state.muted = true;
  videoPlayback.muted = true;
  const videoDuration = videoPlayback.duration;
  console.log('Video duration: ' + videoDuration);
  videoPlayback.currentTime = videoDuration;
  return;
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
