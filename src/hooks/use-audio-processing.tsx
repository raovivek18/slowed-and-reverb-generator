import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export const useAudioProcessing = () => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFileName, setCurrentFileName] = useState('');
  const [volume, setVolume] = useState(1.0); // Set default volume to 100%
  const [speed, setSpeed] = useState(0.85); // Default speed at 85%
  const [reverb, setReverb] = useState(0.5);
  const [eqBands, setEqBands] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const convolverNodeRef = useRef<ConvolverNode | null>(null);
  const dryGainNodeRef = useRef<GainNode | null>(null);
  const wetGainNodeRef = useRef<GainNode | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const eqNodesRef = useRef<BiquadFilterNode[]>([]);
  
  // Initialize audio context
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      createAudioNodes();
    }
    
    return () => {
      if (audioContextRef.current) {
        sourceNodeRef.current?.stop();
        audioContextRef.current.close();
      }
    };
  }, []);

  // Create audio processing nodes
  const createAudioNodes = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Create gain node for volume control
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.gain.value = volume;
    gainNodeRef.current.connect(audioContextRef.current.destination);
    
    // Create reverb related nodes
    convolverNodeRef.current = audioContextRef.current.createConvolver();
    dryGainNodeRef.current = audioContextRef.current.createGain();
    wetGainNodeRef.current = audioContextRef.current.createGain();
    
    // Set up reverb mix
    updateReverbMix(reverb);
    
    // Connect reverb nodes
    convolverNodeRef.current.connect(wetGainNodeRef.current);
    wetGainNodeRef.current.connect(gainNodeRef.current);
    
    // Create EQ nodes
    setupEqualizer();
    
    // Create impulse response for reverb
    createImpulseResponse();
  }, [volume, reverb]);
  
  // Create impulse response for reverb
  const createImpulseResponse = useCallback(async () => {
    if (!audioContextRef.current || !convolverNodeRef.current) return;
    
    const sampleRate = audioContextRef.current.sampleRate;
    const length = 2 * sampleRate; // 2 seconds long impulse response
    const impulseResponse = audioContextRef.current.createBuffer(2, length, sampleRate);
    
    // Fill the buffer with decaying noise to create reverb effect
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulseResponse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        // Random decaying noise for reverb
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
      }
    }
    
    convolverNodeRef.current.buffer = impulseResponse;
  }, []);
  
  // Update reverb wet/dry mix
  const updateReverbMix = useCallback((reverbAmount: number) => {
    if (dryGainNodeRef.current && wetGainNodeRef.current) {
      dryGainNodeRef.current.gain.value = 1 - reverbAmount;
      wetGainNodeRef.current.gain.value = reverbAmount;
    }
  }, []);
  
  // Set up equalizer
  const setupEqualizer = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const EQ_FREQUENCIES = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 16000];
    
    // Create EQ filter nodes
    eqNodesRef.current = EQ_FREQUENCIES.map(freq => {
      const filter = audioContextRef.current!.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = freq;
      filter.gain.value = 0;
      filter.Q.value = 1;
      return filter;
    });
    
    // Connect EQ nodes in series
    if (eqNodesRef.current.length > 0 && dryGainNodeRef.current) {
      dryGainNodeRef.current.connect(eqNodesRef.current[0]);
      
      for (let i = 0; i < eqNodesRef.current.length - 1; i++) {
        eqNodesRef.current[i].connect(eqNodesRef.current[i + 1]);
      }
      
      // Connect the last EQ node to the main gain node
      eqNodesRef.current[eqNodesRef.current.length - 1].connect(gainNodeRef.current!);
    }
  }, []);
  
  // Load audio file
  const loadAudioFile = async (file: File) => {
    if (!audioContextRef.current) return;
    
    try {
      setIsLoading(true);
      stopAudio();
      
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      setAudioBuffer(audioBuffer);
      setCurrentFileName(file.name);
      setDuration(audioBuffer.duration);
      setCurrentTime(0);
      pausedTimeRef.current = 0;
      setIsLoading(false);
      
      // Apply the current EQ settings
      applyEqBands();
    } catch (error) {
      console.error("Failed to load audio file:", error);
      setIsLoading(false);
      toast("Failed to load audio file. Please try another format.");
    }
  };
  
  // Apply current EQ bands
  const applyEqBands = useCallback(() => {
    eqBands.forEach((value, i) => {
      if (eqNodesRef.current[i]) {
        eqNodesRef.current[i].gain.value = value;
      }
    });
  }, [eqBands]);
  
  // Create source node with current settings
  const createSourceNode = useCallback(() => {
    if (!audioContextRef.current || !audioBuffer) return null;
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    
    // Apply speed within valid range: 0.5 to 2.0
    const safeSpeed = Math.min(Math.max(0.5, speed), 2.0);
    source.playbackRate.value = safeSpeed;
    
    // Connect to processing chain
    if (eqNodesRef.current.length > 0) {
      // Source -> Dry path -> EQ chain -> Main output
      source.connect(dryGainNodeRef.current!);
      // Source -> Wet path (reverb) -> Main output
      source.connect(convolverNodeRef.current!);
    } else {
      // Fallback if EQ not initialized
      source.connect(dryGainNodeRef.current!);
      source.connect(convolverNodeRef.current!);
    }
    
    return source;
  }, [audioBuffer, speed]);
  
  // Play audio with current settings
  const playAudio = () => {
    if (!audioContextRef.current || !audioBuffer || isProcessing) return;
    
    try {
      // Stop any currently playing audio
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      }
      
      // Create new source node with current settings
      sourceNodeRef.current = createSourceNode();
      if (!sourceNodeRef.current) return;
      
      // Start playback from the paused time
      sourceNodeRef.current.start(0, pausedTimeRef.current);
      startTimeRef.current = audioContextRef.current.currentTime - pausedTimeRef.current;
      
      // Start progress timer
      if (progressTimerRef.current !== null) {
        window.clearInterval(progressTimerRef.current);
      }
      
      progressTimerRef.current = window.setInterval(() => {
        if (audioContextRef.current) {
          const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
          setCurrentTime(elapsed);
          
          // Stop when reached the end
          if (elapsed >= duration) {
            stopAudio();
          }
        }
      }, 100);
      
      setIsPlaying(true);
      setIsPaused(false);
    } catch (error) {
      console.error("Error playing audio:", error);
      toast("Error playing audio. Please try again.");
    }
  };
  
  // Pause audio playback
  const pauseAudio = () => {
    if (!audioContextRef.current || !sourceNodeRef.current) return;
    
    try {
      // Save current position for resuming later
      pausedTimeRef.current = audioContextRef.current.currentTime - startTimeRef.current;
      
      // Stop the source and timer
      sourceNodeRef.current.stop();
      if (progressTimerRef.current !== null) {
        window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      
      setIsPlaying(false);
      setIsPaused(true);
    } catch (error) {
      console.error("Error pausing audio:", error);
    }
  };
  
  // Stop audio completely
  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (error) {
        // Ignore errors if already stopped
      }
    }
    
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    
    setIsPlaying(false);
    setIsPaused(false);
    pausedTimeRef.current = 0;
    setCurrentTime(0);
  };
  
  // Seek to a specific position
  const seekTo = useCallback((time: number) => {
    if (!audioBuffer) return;
    
    const isPlayingNow = isPlaying;
    
    // Stop current playback
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
    }
    
    // Update time values
    pausedTimeRef.current = Math.min(Math.max(0, time), duration);
    setCurrentTime(pausedTimeRef.current);
    
    // Resume playback if it was playing
    if (isPlayingNow) {
      playAudio();
    }
  }, [audioBuffer, duration, isPlaying]);
  
  // Helper function to convert float32 audio data to int16
  const floatTo16BitPCM = (float32Array: Float32Array): Int16Array => {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      let sample = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    }
    return int16Array;
  };
  
  // Convert buffer to MP3 using lamejs or fallback to WAV
  const encodeMP3 = (buffer: AudioBuffer): Blob => {
    // Check if lamejs is available
    if (typeof (window as any).lamejs === 'undefined') {
      console.error("lamejs not found");
      throw new Error("MP3 encoding library not available");
    }
    
    const Mp3Encoder = (window as any).lamejs.Mp3Encoder;
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const bitRate = 128;
    
    try {
      const mp3encoder = new Mp3Encoder(numChannels, sampleRate, bitRate);
      const blockSize = 1152;
      const mp3Data: Int8Array[] = [];
      
      const left = buffer.getChannelData(0);
      const right = numChannels > 1 ? buffer.getChannelData(1) : left;
      const samplesLength = left.length;
      
      for (let i = 0; i < samplesLength; i += blockSize) {
        const leftChunk = left.subarray(i, i + blockSize);
        const rightChunk = numChannels > 1 ? right.subarray(i, i + blockSize) : leftChunk;
        
        const leftChunkInt16 = floatTo16BitPCM(leftChunk);
        const rightChunkInt16 = numChannels > 1 ? floatTo16BitPCM(rightChunk) : leftChunkInt16;
        
        let mp3buf;
        if (numChannels > 1) {
          mp3buf = mp3encoder.encodeBuffer(leftChunkInt16, rightChunkInt16);
        } else {
          mp3buf = mp3encoder.encodeBuffer(leftChunkInt16);
        }
          
        if (mp3buf && mp3buf.length > 0) {
          mp3Data.push(new Int8Array(mp3buf));
        }
      }
      
      const mp3buf = mp3encoder.flush();
      if (mp3buf && mp3buf.length > 0) {
        mp3Data.push(new Int8Array(mp3buf));
      }
      
      return new Blob(mp3Data, { type: 'audio/mp3' });
    } catch (error) {
      console.error("MP3 encoding error:", error);
      throw new Error("MP3 encoding failed");
    }
  };
  
  // Convert AudioBuffer to WAV
  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2;
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);
    
    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2 * numOfChan, true);
    view.setUint16(32, numOfChan * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, length, true);
    
    // Write audio data
    const channels = [];
    for (let i = 0; i < numOfChan; i++) {
      channels.push(buffer.getChannelData(i));
    }
    
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let j = 0; j < numOfChan; j++) {
        let sample = Math.max(-1, Math.min(1, channels[j][i]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }
    
    return arrayBuffer;
  };
  
  // Helper for writing strings to DataView
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  // Process and export audio
  const exportProcessedAudio = async (format = 'mp3', outputFilename?: string) => {
    if (!audioContextRef.current || !audioBuffer || isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      // Ensure speed is within valid range: 0.5 to 2.0
      const safeSpeed = Math.min(Math.max(0.5, speed), 2.0);
      
      // Create offline context for processing
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length / safeSpeed,
        audioBuffer.sampleRate
      );
      
      // Source node with adjusted speed
      const offlineSource = offlineContext.createBufferSource();
      offlineSource.buffer = audioBuffer;
      offlineSource.playbackRate.value = safeSpeed;
      
      // EQ setup for offline processing
      const EQ_FREQUENCIES = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 16000];
      const offlineEQBands = EQ_FREQUENCIES.map(freq => {
        const filter = offlineContext.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = freq;
        filter.Q.value = 1;
        return filter;
      });
      
      // Apply current EQ settings
      eqBands.forEach((gain, index) => {
        offlineEQBands[index].gain.value = gain;
      });
      
      // Gain node for volume
      const offlineGain = offlineContext.createGain();
      offlineGain.gain.value = volume;
      
      // Reverb setup for offline processing
      const offlineConvolver = offlineContext.createConvolver();
      const offlineDryGain = offlineContext.createGain();
      const offlineWetGain = offlineContext.createGain();
      
      // Create impulse response for offline reverb
      const impulseLength = 2 * offlineContext.sampleRate;
      const impulseBuffer = offlineContext.createBuffer(2, impulseLength, offlineContext.sampleRate);
      for (let channel = 0; channel < 2; channel++) {
        const channelData = impulseBuffer.getChannelData(channel);
        for (let i = 0; i < impulseLength; i++) {
          channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 3);
        }
      }
      offlineConvolver.buffer = impulseBuffer;
      
      // Set reverb mix
      offlineDryGain.gain.value = 1 - reverb;
      offlineWetGain.gain.value = reverb;
      
      // Connect nodes: source -> EQ -> gain -> destination
      // Source to first EQ filter
      offlineSource.connect(offlineEQBands[0]);
      
      // Connect EQ filters in series
      for (let i = 0; i < offlineEQBands.length - 1; i++) {
        offlineEQBands[i].connect(offlineEQBands[i + 1]);
      }
      
      // Last EQ filter to the dry path
      offlineEQBands[offlineEQBands.length - 1].connect(offlineDryGain);
      offlineDryGain.connect(offlineGain);
      
      // Set up reverb path
      offlineSource.connect(offlineConvolver);
      offlineConvolver.connect(offlineWetGain);
      offlineWetGain.connect(offlineGain);
      
      // Final output
      offlineGain.connect(offlineContext.destination);
      
      // Start rendering
      offlineSource.start();
      
      // Render the audio
      const renderedBuffer = await offlineContext.startRendering();
      
      // Determine output format and create appropriate blob
      let blob;
      try {
        if (format === 'mp3') {
          blob = encodeMP3(renderedBuffer);
        } else {
          blob = new Blob([audioBufferToWav(renderedBuffer)], { type: 'audio/wav' });
        }
      } catch (error) {
        console.error("Format conversion error:", error);
        // Fallback to WAV if MP3 fails
        blob = new Blob([audioBufferToWav(renderedBuffer)], { type: 'audio/wav' });
        format = 'wav'; // Update format for filename
      }
      
      // Generate file name if not provided
      const fileNameWithoutExt = currentFileName.replace(/\.[^/.]+$/, "");
      const defaultName = `${fileNameWithoutExt}_Slower+Reverb_slowedandreverbgenerator.com.${format}`;
      const downloadName = outputFilename || defaultName;
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = downloadName;
      
      // Trigger the download
      downloadLink.click();
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(downloadLink.href), 100);
      
      toast("Your processed audio has been downloaded!");
      
      setIsProcessing(false);
    } catch (error) {
      console.error("Error exporting audio:", error);
      toast("Error processing audio. Please try again.");
      setIsProcessing(false);
    }
  };
  
  // Update when volume changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);
  
  // Update when reverb changes
  useEffect(() => {
    updateReverbMix(reverb);
  }, [reverb, updateReverbMix]);
  
  // Update when EQ bands change
  useEffect(() => {
    applyEqBands();
  }, [eqBands, applyEqBands]);
  
  // Format time for display
  const formatTime = (seconds: number) => {
    seconds = Math.floor(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return {
    audioBuffer,
    isPlaying,
    isPaused,
    currentTime,
    duration,
    isLoading,
    isProcessing,
    currentFileName,
    eqBands,
    loadAudioFile,
    playAudio,
    pauseAudio,
    stopAudio,
    seekTo,
    exportProcessedAudio,
    setEqBands,
    setSpeed,
    setReverb,
    setVolume,
    speed,
    reverb,
    volume,
    formatTime
  };
};
