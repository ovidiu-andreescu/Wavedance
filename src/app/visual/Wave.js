'use client'

import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';

const AudioVisualizer = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    if (audioFile) {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      const cursor = CursorPlugin.create({
        showTime: true,
        opacity: 1,
        color: 'violet',
        customShowTimeStyle: {
          'background-color': '#000',
          color: '#fff',
          padding: '2px',
          'font-size': '10px'
        }
      });

      const minimap = MinimapPlugin.create({
        height: 30,
        waveColor: '#ddd',
        progressColor: '#999',
        cursorColor: '#999'
      });

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorWidth: 1,
        barWidth: 2,
        barRadius: 2,
        cursorColor: '#333',
        height: 200,
        barGap: 2,
        plugins: [
          RegionsPlugin.create(),
          cursor,
          minimap
        ]
      });

      wavesurfer.current.load(URL.createObjectURL(audioFile));
      wavesurfer.current.setVolume(1);
    }

    return () => wavesurfer.current && wavesurfer.current.destroy();
  }, [audioFile]);

  const handleClick = () => {
    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <div ref={waveformRef} onClick={handleClick} style={{ height: '200px', width: '100%' }} />


      
    </div>
  );
};

export default AudioVisualizer;
