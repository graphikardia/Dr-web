import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [aspectRatio, setAspectRatio] = useState<"vertical" | "horizontal">(
    "vertical",
  );

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

  const getEmbedUrl = (url: string) => {
    const videoId = url.split("/reel/")[1]?.split("/")[0];
    if (videoId) {
      return `https://www.instagram.com/reel/${videoId}/embed/captioned/`;
    }
    return url;
  };

  const containerClasses =
    aspectRatio === "vertical" ? "w-full max-w-sm" : "w-full max-w-4xl";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className={`relative ${containerClasses} bg-black rounded-2xl overflow-hidden shadow-2xl animate-scale-in`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
          aria-label="Close video"
        >
          <X size={24} className="text-white" />
        </button>

        <div
          className={
            aspectRatio === "vertical" ? "aspect-[9/16]" : "aspect-video"
          }
          style={{ maxHeight: "85vh" }}
        >
          <iframe
            src={getEmbedUrl(videoUrl)}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            onLoad={(e) => {
              const iframe = e.target as HTMLIFrameElement;
              const width = iframe.clientWidth;
              const height = iframe.clientHeight;
              if (height > width) {
                setAspectRatio("vertical");
              } else {
                setAspectRatio("horizontal");
              }
            }}
          />
        </div>

        <div className="bg-black/50 px-6 py-4 border-t border-white/10">
          <h3 className="text-white font-bold text-lg">{videoTitle}</h3>
          <p className="text-white/70 text-sm mt-1">
            Click outside or press ESC to close
          </p>
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
