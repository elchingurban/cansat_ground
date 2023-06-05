import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

function VideoRecorder() {
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
  
    const handleDataAvailable = useCallback(
      ({ data }: any) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
      if(!webcamRef.current) return;
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream!, {
          mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
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
            type: "video/webm",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = `ground-video-${(new Date()).toString()}.webm`;
          a.click();
          window.URL.revokeObjectURL(url);
          setRecordedChunks([]);
        }
      }, [recordedChunks]);
    
      const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user"
    };

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log('videoDevices',videoDevices);
    })
    .catch(error => {
      console.error('Error accessing media devices:', error);
    });
    })
    
    return <div className="Container">
    <Webcam
      height={400}
      width={400}
      audio={false}
      mirrored={true}
      ref={webcamRef}
      videoConstraints={videoConstraints}
    />
    {capturing ? (
      <button onClick={handleStopCaptureClick}>Stop Capture</button>
    ) : (
      <button onClick={handleStartCaptureClick}>Start Capture</button>
    )}
    {recordedChunks.length > 0 && (
      <button onClick={handleDownload}>Download</button>
    )}
  </div>
}


export default VideoRecorder;