
import { useState, useRef, useEffect } from 'react';
import { Disc, Download, Play, Pause, Upload, Info, Trash2, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAudioProcessing } from '@/hooks/use-audio-processing';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define frequencies for EQ bands
const EQ_FREQUENCIES = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 16000];

// Define EQ presets
const EQ_PRESETS = {
  flat: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  bassBoost: [10, 8, 6, 3, 0, 0, 0, 0, 0],
  trebleBoost: [0, 0, 0, 0, 0, 3, 6, 8, 10],
  vocalBoost: [0, 0, 0, 3, 6, 6, 3, 0, 0],
  electronic: [4, 3, 0, -2, -3, 0, 3, 5, 6],
  rock: [4, 3, 2, 0, -1, 0, 2, 3, 4],
  classical: [2, 1, 0, 0, 0, 0, -1, -2, -3]
};

const AudioProcessor = () => {
  const {
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
  } = useAudioProcessing();

  // Set default speed and reverb on component mount
  useEffect(() => {
    setSpeed(0.85);  // Default speed at 85%
    setReverb(0.5);  // Default reverb at 50%
    setVolume(1.0);  // Default volume at 100%
  }, []);

  // Local state and refs
  const [showAudioEditor, setShowAudioEditor] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPreset, setCurrentPreset] = useState('flat');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const discRef = useRef<HTMLImageElement>(null);

  // Handle drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Modify file upload handlers to play audio immediately
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      await loadAudioFile(file);
      setShowAudioEditor(true);
      
      // Ensure audio plays immediately with default settings
      setTimeout(() => {
        playAudio();
      }, 100);
      
      toast("Audio loaded successfully: " + file.name);
    } catch (error) {
      console.error("Error loading audio file:", error);
      toast("Error loading audio. Please try another file.");
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('audio/')) {
      toast("Please upload an audio file");
      return;
    }
    
    try {
      await loadAudioFile(file);
      setShowAudioEditor(true);
      
      // Ensure audio plays immediately with default settings
      setTimeout(() => {
        playAudio();
      }, 100);
      
      toast("Audio loaded successfully: " + file.name);
    } catch (error) {
      console.error("Error loading audio file:", error);
      toast("Error loading audio. Please try another file.");
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Handle progress bar interaction
  const handleProgressChange = (values: number[]) => {
    if (!audioBuffer) return;
    const position = values[0];
    seekTo(position);
  };

  // Remove the current audio
  const handleRemoveAudio = () => {
    if (isPlaying) {
      stopAudio();
    }
    
    setShowAudioEditor(false);
    toast("Audio removed");
  };

  // Apply EQ preset
  const applyPreset = (presetName: keyof typeof EQ_PRESETS) => {
    setEqBands([...EQ_PRESETS[presetName]]);
    setCurrentPreset(presetName);
  };

  // Handle speed change with immediate effect
  const handleSpeedChange = (values: number[]) => {
    const newSpeed = values[0];
    setSpeed(newSpeed);
    
    // If currently playing, restart with new speed
    if (isPlaying && audioBuffer) {
      pauseAudio();
      setTimeout(() => playAudio(), 50);
    }
  };
  
  // Handle reverb change with immediate effect
  const handleReverbChange = (values: number[]) => {
    const newReverb = values[0];
    setReverb(newReverb);
    
    // If currently playing, restart with new reverb
    if (isPlaying && audioBuffer) {
      pauseAudio();
      setTimeout(() => playAudio(), 50);
    }
  };

  // Handle EQ band change
  const handleEqBandChange = (index: number, value: number) => {
    const newBands = [...eqBands];
    newBands[index] = value;
    setEqBands(newBands);
    setCurrentPreset('custom');
    
    // Apply EQ changes if audio is playing
    if (isPlaying && audioBuffer) {
      pauseAudio();
      setTimeout(() => playAudio(), 50);
    }
  };

  // Handle export with format selection
  const handleExport = () => {
    try {
      if (!audioBuffer) {
        toast("No audio loaded to export");
        return;
      }
      
      exportProcessedAudio('wav', `${getFileNameWithoutExt(currentFileName)}_Slower+Reverb_slowedandreverbgenerator.com.wav`);
    } catch (error) {
      console.error("Export error:", error);
      toast("Error during export. Please try again.");
    }
  };

  // Helper to get filename without extension
  const getFileNameWithoutExt = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
  };

  // Handle disc rotation for visualization
  useEffect(() => {
    if (discRef.current && audioBuffer) {
      if (isPlaying) {
        discRef.current.style.animationPlayState = 'running';
      } else {
        discRef.current.style.animationPlayState = 'paused';
      }
    }
  }, [isPlaying, audioBuffer]);

  return (
    <div className="w-full mx-auto">
      {!showAudioEditor ? (
        // Audio Upload Hero Section
        <div 
          className={`w-full max-w-4xl mx-auto py-12 text-center cursor-pointer ${isDragging ? 'border-2 border-dashed border-purple-light bg-purple-dark/10 rounded-lg' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="w-full max-w-md bg-secondary p-10 rounded-lg border border-white/10 shadow-lg hover:border-purple-light/50 transition-all">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac"
                className="hidden"
              />
              <div className="flex flex-col items-center text-center">
                <Upload className="h-16 w-16 text-purple-light mb-4" />
                <h3 className="text-xl font-medium mb-2">Drag and drop your audio file</h3>
                <p className="text-gray-400 mb-6">or</p>
                <Button 
                  className="bg-gradient-purple hover:opacity-90 py-6 px-8"
                  size="lg"
                >
                  <Upload className="mr-2 h-5 w-5" /> Select Audio File
                </Button>
                
                {isLoading && (
                  <div className="mt-6 flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-purple-light border-t-transparent rounded-full mr-2"></div>
                    <span>Processing audio...</span>
                  </div>
                )}
                
                {currentFileName && !showAudioEditor && (
                  <p className="mt-4 text-sm text-gray-400">
                    Selected: <span className="text-white">{currentFileName}</span>
                  </p>
                )}
              </div>
            </div>
            
            <div className="text-gray-400 text-sm">
              Supported formats: MP3, WAV, FLAC, M4A, AAC, OGG
            </div>
          </div>
        </div>
      ) : (
        // Audio Editor Section
        <div className="w-full max-w-4xl mx-auto p-4">
          <Card className="bg-secondary p-4 sm:p-6 rounded-lg border border-white/10 shadow-lg">
            {/* Audio controls and editor */}
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold truncate">{currentFileName}</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10 w-full sm:w-auto"
                onClick={handleRemoveAudio}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Remove Audio
              </Button>
            </div>

            {/* Player and controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Player */}
              <div className="col-span-1 md:col-span-1 flex flex-col items-center justify-start">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4">
                  <img
                    ref={discRef}
                    src="/lovable-uploads/82d01567-789e-4e81-b746-0d3b22e1803c.png"
                    alt="Vinyl Record"
                    className={`w-full h-full ${isPlaying ? 'animate-spin-slow' : ''}`}
                    style={{ 
                      animation: 'rotateDisc 6s linear infinite',
                      animationPlayState: isPlaying ? 'running' : 'paused'
                    }}
                  />
                </div>
                
                <Button
                  onClick={togglePlayPause}
                  disabled={!audioBuffer}
                  size="icon"
                  className="w-10 h-10 rounded-md bg-purple-dark hover:bg-purple text-white mb-4"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>

                <div className="w-full">
                  <Slider
                    value={[currentTime]}
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={handleProgressChange}
                    disabled={!audioBuffer}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration || 0)}</span>
                  </div>
                </div>
              </div>

              {/* Effect controls */}
              <div className="col-span-1 md:col-span-2">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-300">Speed</label>
                      <span className="text-sm text-purple-light">{speed.toFixed(2)}x</span>
                    </div>
                    <Slider
                      value={[speed]}
                      min={0.5}
                      max={2.0}
                      step={0.01}
                      onValueChange={handleSpeedChange}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.5x</span>
                      <span>2.0x</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-300">Reverb</label>
                      <span className="text-sm text-purple-light">{(reverb * 100).toFixed(0)}%</span>
                    </div>
                    <Slider
                      value={[reverb]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleReverbChange}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-300">Volume</label>
                      <span className="text-sm text-purple-light">{(volume * 100).toFixed(0)}%</span>
                    </div>
                    <Slider
                      value={[volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={(values) => setVolume(values[0])}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equalizer (Collapsible) */}
            <div className="mt-8">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                      <Sliders className="h-4 w-4 mr-2" />
                      <span>Equalizer</span>
                    </div>
                    <span className="text-xs text-gray-400">(Optional)</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <Card className="bg-gray-800/50 p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Presets</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {Object.keys(EQ_PRESETS).map((preset) => (
                          <Button
                            key={preset}
                            variant={currentPreset === preset ? "default" : "outline"}
                            size="sm"
                            onClick={() => applyPreset(preset as keyof typeof EQ_PRESETS)}
                            className={`text-xs ${currentPreset === preset ? 'bg-purple-light text-white' : 'text-gray-300'}`}
                          >
                            {preset.charAt(0).toUpperCase() + preset.slice(1).replace(/([A-Z])/g, ' $1')}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="h-40 overflow-x-auto">
                      <div className="flex justify-between gap-1 min-w-[500px]">
                        {EQ_FREQUENCIES.map((freq, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div className="h-24 flex items-center">
                              <Slider
                                value={[eqBands[index]]}
                                min={-12}
                                max={12}
                                step={1}
                                orientation="vertical"
                                onValueChange={(values) => handleEqBandChange(index, values[0])}
                                className="cursor-pointer h-24"
                              />
                            </div>
                            <div className="text-xs text-gray-400 mt-2 text-center whitespace-nowrap">
                              {freq < 1000 ? `${freq}Hz` : `${freq/1000}kHz`}
                            </div>
                            <div className="text-xs text-gray-400 text-center">
                              {eqBands[index] > 0 ? `+${eqBands[index]}` : eqBands[index]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Export section - simplified without format selection */}
            <div className="mt-8">
              <div className="flex flex-col items-center">
                <Button
                  onClick={handleExport}
                  disabled={!audioBuffer || isProcessing}
                  className="bg-gradient-purple hover:opacity-90 text-white py-6 px-8 rounded-lg shadow-md flex items-center gap-2 w-full sm:w-auto"
                >
                  <Download className="h-5 w-5 mr-1" />
                  {isProcessing ? "Processing..." : "Download Slowed+Reverb Audio"}
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
                <Info className="h-4 w-4" />
                High quality WAV export with your custom settings
              </p>
            </div>

          </Card>
        </div>
      )}
    </div>
  );
};

export default AudioProcessor;
