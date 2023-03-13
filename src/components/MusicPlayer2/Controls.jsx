import { useState, useEffect, useRef, useCallback } from 'react';

// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  songsData,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const pointsPerSec = 0.166666;
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current) {
      const updatePoints = () => {
        const currentTime = audioRef.current.currentTime;
        setPoints(Math.floor(currentTime * pointsPerSec));
      };
      audioRef.current.addEventListener('timeupdate', updatePoints);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updatePoints);
        }
      };
    }
  }, [audioRef, pointsPerSec]);

  useEffect(() => {
    console.log("Congratulations! You have earned " + points + " points");
  }, [points]);



  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);

  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = songsData.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(songsData[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(songsData[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp />
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp />
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp />
        </button>
      </div>
      <div className="volume">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
