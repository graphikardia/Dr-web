import { X, ExternalLink, Play } from "lucide-react";
import { useEffect, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  videoTitle: string;
  thumbnail?: string;
  onClose: () => void;
}

export const VideoModal = ({
  isOpen,
  videoUrl,
  videoTitle,
  thumbnail,
  onClose,
}: VideoModalProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoaded(false);
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getVideoId = (url: string) => {
    return url.split("/reel/")[1]?.split("/")[0];
  };

  const videoId = getVideoId(videoUrl);

  const openInInstagram = () => {
    window.open(`https://www.instagram.com/reel/${videoId}/`, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg md:max-w-xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
          aria-label="Close video"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="aspect-[9/16] w-full relative">
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </div>
            </div>
          ) : null}
          <iframe
            src={`https://www.instagram.com/reel/${videoId}/embed`}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full relative z-10"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="bg-black/80 px-4 py-3 border-t border-white/10 flex items-center justify-between">
          <h3 className="text-white font-bold text-sm">{videoTitle}</h3>
          <a
            href={`https://www.instagram.com/reel/${videoId}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Open in Instagram
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};
