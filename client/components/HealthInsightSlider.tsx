import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import {
  INSIGHT_VIDEOS,
  LEGACY_INSIGHT_VIDEO,
  OBESITY_CLINIC,
  type InsightVideo,
} from "@/data/obesityClinic";
import { cn } from "@/lib/utils";

const SLIDES: InsightVideo[] = [...INSIGHT_VIDEOS, LEGACY_INSIGHT_VIDEO];
const AUTOPLAY_MS = 7000;

export function HealthInsightSlider({
  videos = SLIDES,
  className,
}: {
  videos?: InsightVideo[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = videos.length;
  const current = videos[index] ?? videos[0];

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!isPlaying || total < 2) return;
    timerRef.current = setTimeout(() => go(index + 1), AUTOPLAY_MS);
  }, [go, index, isPlaying, total]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [restartTimer]);

  useEffect(() => {
    setMuted(true);
    setIsPlaying(true);
  }, [index]);

  useEffect(() => {
    const el = videoRef.current;
    if (el) el.muted = muted;
  }, [muted]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) {
      el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [isPlaying, current.src]);

  const jumpTo = (next: number) => {
    go(next);
    restartTimer();
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
        className,
      )}
    >
      {/* Player */}
      <div className="relative order-1">
        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] rounded-[2rem] overflow-hidden shadow-2xl bg-black ring-1 ring-black/10">
          <video
            key={current.src}
            ref={videoRef}
            className="w-full aspect-[9/16] object-cover"
            playsInline
            muted={muted}
            loop
            autoPlay
            preload="auto"
            poster={current.poster || undefined}
          >
            <source src={current.src} type="video/mp4" />
          </video>

          {/* Play / pause */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="absolute inset-0 z-10 flex items-center justify-center group"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <span
              className={cn(
                "w-16 h-16 rounded-full bg-black/45 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white transition-all duration-300",
                "group-hover:scale-110 group-hover:bg-black/65",
                isPlaying
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-100",
              )}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7 ml-1" />
              )}
            </span>
          </button>

          {/* Mute */}
          <button
            onClick={() => setMuted((m) => !m)}
            className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm border border-white/20"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          {/* Episode badge */}
          <div className="absolute top-4 left-4 z-20 bg-black/55 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
            {current.episode}
          </div>
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={() => jumpTo(index - 1)}
              className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 w-10 h-10 rounded-full bg-white text-primary shadow-lg border border-gray-100 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => jumpTo(index + 1)}
              className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 w-10 h-10 rounded-full bg-white text-primary shadow-lg border border-gray-100 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Next video"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Copy */}
      <div className="order-2 text-left">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
            {current.episode}
          </span>
          <span className="bg-white text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold border border-gray-100">
            {current.duration}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-4">
          {current.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-5">
          {current.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {current.topics.map((topic) => (
            <span
              key={topic}
              className="bg-accent/10 text-accent px-3 py-1 rounded-lg text-xs font-bold"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={OBESITY_CLINIC.bookPath}
            className="btn-accent font-bold flex items-center justify-center gap-2 group"
          >
            <CalendarCheck className="w-5 h-5" />
            Book Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={`tel:${OBESITY_CLINIC.frontOffice}`}
            className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
          >
            {OBESITY_CLINIC.frontOfficeDisplay}
          </a>
        </div>

        <p className="text-xs text-muted-foreground/80 mt-4">
          Obesity Clinic — {OBESITY_CLINIC.daysLabel} ·{" "}
          {OBESITY_CLINIC.sessionsLabel}
        </p>

        {/* Dots */}
        {total > 1 && (
          <div className="flex items-center gap-2 mt-6">
            {videos.map((video, i) => (
              <button
                key={video.id}
                onClick={() => jumpTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-accent"
                    : "w-2 bg-gray-200 hover:bg-accent/50",
                )}
                aria-label={`Show ${video.episode}`}
                aria-current={i === index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
