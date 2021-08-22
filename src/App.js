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
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import SettingsIcon from "@material-ui/icons/Settings";
import Settings from "./components/Settings";
import ControlButton from "./components/ControlButton";
import mergeClassNames from "./lib/mergeClassNames";

const autoPlay = true;
export default function App() {
  const videoRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(autoPlay);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUserUpdatingTime, setIsUserUpdatingTime] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMute, setIsMute] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const playerRef = useRef();
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

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

  function toggleFullscreen() {
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
      const player = playerRef.current;

      if (player.requestFullscreen) {
        player.requestFullscreen();
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
      }
    }
  }

  function toggleSettingsMenu() {
    setIsSettingsActive((old) => !old);
  }

  function handleOnPlaybackSpeedChange(value) {
    const video = videoRef.current;
    video.playbackRate = value;

    setPlaybackSpeed(value);
  }

  function getSettingChangeHandler(fn) {
    return (...args) => {
      fn(...args);
      setIsSettingsActive(false);
    };
  }

  useEffect(() => {
    const player = playerRef.current;

    function onFullScreenChange() {
      if (document.fullscreenElement === player) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    }

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (!isUserUpdatingTime) return;
    const video = videoRef.current;
    video.currentTime = progress;
  }, [progress, isUserUpdatingTime]);

  const PlayPauseIcon = isVideoPlaying ? PauseIcon : PlayIcon;
  const VolumeIcon = volume === 0 || isMute ? VolumeOffIcon : VolumeUpIcon;
  const FSIcon = isFullScreen ? FullscreenExitIcon : FullscreenIcon;

  return (
    <div>
      <div
        className={mergeClassNames(
          styles.player,
          isSettingsActive && styles.controlsVisible
        )}
        ref={playerRef}
      >
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
          {isSettingsActive && (
            <Settings
              onPlaybackSpeedChange={getSettingChangeHandler(
                handleOnPlaybackSpeedChange
              )}
              playbackSpeed={playbackSpeed}
            />
          )}
          <ProgressBar
            onChange={handleVideoTimeChange}
            onChangeCommitted={handleVideoTimeChangeCommitted}
            value={progress}
            max={duration}
          />
          <div className={styles.controlsBottom}>
            <div className={styles.left}>
              <ControlButton onClick={handlePlayPause}>
                <PlayPauseIcon style={{ fontSize: 32 }} />
              </ControlButton>
              <div className={styles.volumeControl}>
                <ControlButton onClick={toggleMute}>
                  <VolumeIcon style={{ fontSize: 28 }} />
                </ControlButton>
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
            <div className={styles.right}>
              <ControlButton onClick={toggleSettingsMenu}>
                <SettingsIcon style={{ fontSize: 24 }} />
              </ControlButton>
              <ControlButton onClick={toggleFullscreen}>
                <FSIcon style={{ fontSize: 32 }} />
              </ControlButton>
            </div>
          </div>
        </div>
        <div className={styles.gradient} />
      </div>
    </div>
  );
}
