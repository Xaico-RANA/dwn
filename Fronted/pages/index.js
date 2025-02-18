import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleDownload = async () => {
    const res = await fetch("http://localhost:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (data.downloadUrl) setDownloadUrl(data.downloadUrl);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Video Downloader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter video URL"
      />
      <button onClick={handleDownload}>Download</button>
      {downloadUrl && <a href={downloadUrl} target="_blank">Click to Download</a>}
    </div>
  );
}
