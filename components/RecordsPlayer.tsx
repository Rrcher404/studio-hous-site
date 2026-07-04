"use client";

import { useEffect, useRef, useState } from "react";
import { RELEASE, TRACKS } from "@/lib/records";

function fmt(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/** Glass audio player for SolHous Records. Renders nothing if the shelf is empty. */
export function RecordsPlayer() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = TRACKS[idx];

  useEffect(() => {
    // When the track changes while playing, keep playing the new one.
    if (playing) audioRef.current?.play().catch(() => setPlaying(false));
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!track) return null;

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  function playAt(i: number) {
    setIdx(i);
    setTime(0);
    setPlaying(true);
    // play() fires from the idx effect once the new src is set.
    requestAnimationFrame(() => audioRef.current?.play().catch(() => setPlaying(false)));
  }

  const prev = () => playAt((idx - 1 + TRACKS.length) % TRACKS.length);
  const next = () => playAt((idx + 1) % TRACKS.length);

  return (
    <div className="player glass distort">
      <div className="phead">
        <img
          className="cover"
          src={RELEASE.cover}
          alt={`${RELEASE.title} — EP cover art: a stairway rising toward a low sun over water.`}
        />
        <div className="pmeta">
          <p className="kindtag">
            Now playing · {RELEASE.title} — EP · {RELEASE.year}
          </p>
          <h3>{track.title}</h3>
          <a className="applelink" href={RELEASE.appleUrl} target="_blank" rel="noopener">
            Open in Apple Music ›
          </a>
        </div>
      </div>
      <input
        className="seek"
        type="range"
        min={0}
        max={dur || 0}
        step={0.1}
        value={Math.min(time, dur || 0)}
        aria-label="Seek"
        onChange={(e) => {
          const t = Number(e.target.value);
          if (audioRef.current) audioRef.current.currentTime = t;
          setTime(t);
        }}
      />
      <div className="ctrl">
        <button type="button" onClick={prev} aria-label="Previous track">
          ‹‹
        </button>
        <button type="button" className="play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? "❚❚" : "►"}
        </button>
        <button type="button" onClick={next} aria-label="Next track">
          ››
        </button>
        <span className="time">
          {fmt(time)} / {fmt(dur)}
        </span>
      </div>
      {TRACKS.length > 1 && (
        <div className="tracklist">
          {TRACKS.map((t, i) => (
            <button
              key={t.src}
              type="button"
              aria-current={i === idx || undefined}
              onClick={() => playAt(i)}
            >
              <span>{t.title}</span>
              <span className="kindtag">{t.length ?? t.kind}</span>
            </button>
          ))}
        </div>
      )}
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={next}
      />
    </div>
  );
}
