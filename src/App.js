import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import styles from "./styles/App.module.css";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import VolumeBar from "./components/VolumeBar";
import toHHMMSS from "./utils/toHHMMSS";
import Typography from "@material-ui/core/Typography";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

const autoPlay = true;
export default function App() {
  const videoRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(autoPlay);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUserUpdatingTime, setIsUserUpdatingTime] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMute, setIsMute] = useState(false);

  function handlePlayPause() {
    setIsVideoPlaying((isPlaying) => {
      const video = videoRef.current;
      isPlaying ? video.pause() : video.play();
      return !isPlaying;
    });
  }

  function handleVideoTimeChange(event, value) {
    setIsUserUpdatingTime(true);
    setProgress(value || 0);
  }

  function handleVideoTimeChangeCommitted() {
    setIsUserUpdatingTime(false);
  }

  function onLoadedMetaData(event) {
    setDuration(event.target.duration);
  }

  function onTimeUpdate(event) {
    setProgress(event.target.currentTime || 0);
  }

  function handleVolumeChange(event, value) {
    const video = videoRef.current;
    video.volume = (value || 0) / 100;
    setVolume(value);
  }

  function toggleMute() {
    setIsMute((old) => !old);
  }

  useEffect(() => {
    if (!isUserUpdatingTime) return;
    const video = videoRef.current;
    video.currentTime = progress;
  }, [progress, isUserUpdatingTime]);

  const PlayPauseIcon = isVideoPlaying ? PauseIcon : PlayIcon;
  const VolumeIcon = volume === 0 || isMute ? VolumeOffIcon : VolumeUpIcon;
  return (
    <div>
      <div className={styles.player}>
        <video
          muted={isMute}
          autoPlay={autoPlay}
          onLoadedMetadata={onLoadedMetaData}
          onTimeUpdate={onTimeUpdate}
          className={styles.video}
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
        <div className={styles.controls}>
          <ProgressBar
            onChange={handleVideoTimeChange}
            onChangeCommitted={handleVideoTimeChangeCommitted}
            value={progress}
            max={duration}
          />
          <div className={styles.controlsBottom}>
            <button className={styles.controlButton} onClick={handlePlayPause}>
              <PlayPauseIcon style={{ color: "white", fontSize: 32 }} />
            </button>
            <div className={styles.volumeControl}>
              <button className={styles.controlButton} onClick={toggleMute}>
                <VolumeIcon style={{ color: "white", fontSize: 28 }} />
              </button>
              <div className={styles.volumeBar}>
                <VolumeBar
                  onChange={handleVolumeChange}
                  value={volume}
                  max={100}
                />
              </div>
            </div>
            <Typography variant="body2" className={styles.duration}>
              {toHHMMSS(progress)} / {toHHMMSS(duration)}
            </Typography>
          </div>
        </div>
        <div className={styles.gradient} />
      </div>
    </div>
  );
}
