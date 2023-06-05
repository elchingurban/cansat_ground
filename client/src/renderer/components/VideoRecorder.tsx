import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Webcam from 'react-webcam';

function VideoRecorder() {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    if (!webcamRef.current) return;
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream!, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = `ground-video-${new Date().toString()}.webm`;
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = useMemo(
    () =>
      deviceId
        ? {
            facingMode: 'user',
            deviceId,
          }
        : {
            facingMode: 'user',
          },
    [deviceId]
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between">
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        className="h-full w-full"
      />
      <div className="absolute">
        <select
          value={deviceId}
          onChange={(event) => setDeviceId(event.target.value)}
        >
          <option value="">Select a port</option>
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
      <div className="absolute bottom-2">
        {capturing ? (
          <button
            className="mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
            onClick={handleStopCaptureClick}
          >
            Stop Capture
          </button>
        ) : (
          <button
            className="mr-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
            onClick={handleStartCaptureClick}
          >
            Start Capture
          </button>
        )}
        {recordedChunks.length > 0 && (
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            onClick={handleDownload}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoRecorder;
