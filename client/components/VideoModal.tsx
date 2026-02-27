import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  videoTitle: string;
  onClose: () => void;
}

export const VideoModal = ({
  isOpen,
  videoUrl,
  videoTitle,
  onClose,
}: VideoModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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

  // Extract Instagram video ID from URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("/reel/")[1]?.split("/")[0];
    if (videoId) {
      return `https://www.instagram.com/reel/${videoId}/embed/captioned/`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
          aria-label="Close video"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Video Container */}
        <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(videoUrl)}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Title */}
        <div className="bg-black/50 px-6 py-4 border-t border-white/10">
          <h3 className="text-white font-bold text-lg">{videoTitle}</h3>
          <p className="text-white/70 text-sm mt-1">
            Click outside or press ESC to close
          </p>
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};
