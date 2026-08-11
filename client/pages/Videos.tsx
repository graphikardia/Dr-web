import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { useState, useRef } from "react";
import { Play, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoModal } from "@/components/VideoModal";

const categoryGradients: Record<string, string> = {
  diabetes: "from-blue-600 to-blue-400",
  respiratory: "from-teal-600 to-teal-400",
  lifestyle: "from-green-600 to-green-400",
  "health-tips": "from-orange-500 to-amber-400",
  media: "from-purple-600 to-purple-400",
  all: "from-primary to-primary/70",
};

interface Video {
  id: number;
  title: string;
  category: string;
  url: string;
  thumbnail: string;
  views: string;
}

const categories = [
  { id: "all", label: "All Videos" },
  { id: "diabetes", label: "Diabetes" },
  { id: "respiratory", label: "Respiratory" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "health-tips", label: "Health Tips" },
  { id: "media", label: "Media Features" },
];

const videos: Video[] = [
  { id: 1, title: "Health Awareness Reel 1", category: "lifestyle", url: "https://www.instagram.com/reel/DZZ0DFToL0O/", thumbnail: "", views: "1K+" },
  { id: 2, title: "Health Awareness Reel 2", category: "lifestyle", url: "https://www.instagram.com/reel/DZInGWgyoBS/", thumbnail: "", views: "1K+" },
  { id: 3, title: "Health Awareness Reel 3", category: "health-tips", url: "https://www.instagram.com/reel/DYxM1nbsjN1/", thumbnail: "", views: "1K+" },
  { id: 4, title: "Health Awareness Reel 4", category: "lifestyle", url: "https://www.instagram.com/reel/DYRb5Lhofvu/", thumbnail: "", views: "1K+" },
  { id: 5, title: "Health Awareness Reel 5", category: "diabetes", url: "https://www.instagram.com/reel/DXreAAxiLUK/", thumbnail: "", views: "1K+" },
  { id: 6, title: "Health Awareness Reel 6", category: "respiratory", url: "https://www.instagram.com/reel/DXOCpZ3jH2s/", thumbnail: "", views: "1K+" },
  { id: 7, title: "Health Awareness Reel 7", category: "health-tips", url: "https://www.instagram.com/reel/DXG1OTnCLv2/", thumbnail: "", views: "1K+" },
  { id: 8, title: "Health Awareness Reel 8", category: "lifestyle", url: "https://www.instagram.com/reel/DW3Ib_rEaaJ/", thumbnail: "", views: "1K+" },
  { id: 9, title: "Health Awareness Reel 9", category: "diabetes", url: "https://www.instagram.com/reel/DWzVtx7EuJP/", thumbnail: "", views: "1K+" },
  { id: 10, title: "Health Awareness Reel 10", category: "health-tips", url: "https://www.instagram.com/reel/DWlqguqCFo7/", thumbnail: "", views: "1K+" },
  { id: 11, title: "Health Awareness Reel 11", category: "lifestyle", url: "https://www.instagram.com/reel/DWQa8fVieG7/", thumbnail: "", views: "1K+" },
  { id: 12, title: "Health Awareness Reel 12", category: "respiratory", url: "https://www.instagram.com/reel/DWGdL_6CbAk/", thumbnail: "", views: "1K+" },
];

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
    thumbnail: string;
  } | null>(null);

  const filteredVideos =
    activeCategory === "all"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  const getInstagramThumbnail = (url: string) => {
    const match = url.match(/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.instagram.com/p/${match[1]}/media/?size=l`;
    }
    return "";
  };

  return (
    <Layout>
      <SEOHead
        title="Health Videos by Dr. Darshana Reddy"
        description="Watch health awareness videos by Dr. Darshana Reddy on diabetes management, respiratory health, lifestyle wellness, and preventive medicine tips."
        canonical="/videos"
        ogType="video.other"
      />
      <div className="section-padding bg-gray-50 min-h-screen">
        <div className="container-max">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Health Awareness & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Informative videos by Dr. Darshana Reddy on managing diabetes,
              respiratory health, and lifestyle wellness.
            </p>
          </div>

          {/* Featured Video */}
          <div className="mb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-6 md:p-8 border border-accent/20 shadow-lg animate-slide-up">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
              <span className="text-xs text-muted-foreground">
                23rd May 2026
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
              Of the many CME programs — Addressing hundreds of Doctors
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              23rd May 2026 — CME Programme on lifestyle diseases and preventive
              medicine.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-black relative">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                playsInline
                muted={isMuted}
                loop
                autoPlay
                preload="auto"
              >
                <source src="/CME-Programme.mp4" type="video/mp4" />
              </video>
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm border border-white/20"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border-2",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                    : "bg-white text-muted-foreground border-gray-100 hover:border-accent hover:text-accent",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, idx) => (
              <div
                key={video.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Thumbnail Container */}
                <div
                  className="relative aspect-[9/16] overflow-hidden cursor-pointer bg-gray-200"
                  onClick={() =>
                    setSelectedVideo({
                      url: video.url,
                      title: video.title,
                      thumbnail: getInstagramThumbnail(video.url),
                    })
                  }
                >
                  {/* Loading Skeleton */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />

                  <img
                    src={getInstagramThumbnail(video.url)}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      const skeleton = target.previousElementSibling;
                      if (skeleton) skeleton.classList.add("hidden");
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const skeleton = target.previousElementSibling;
                      if (skeleton) {
                        skeleton.classList.remove(
                          "animate-pulse",
                          "from-gray-200",
                          "to-gray-100",
                        );
                        skeleton.classList.add(
                          "bg-gradient-to-br",
                          "from-primary/40",
                          "to-accent/40",
                        );
                        skeleton.classList.remove("hidden");
                      }
                    }}
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center z-20">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="w-8 h-8 text-primary group-hover:text-white fill-current" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-white/20">
                      <Instagram className="w-3 h-3" />
                      WATCH REEL
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                    <span className="text-accent underline decoration-accent/30 underline-offset-4">
                      {categories.find((c) => c.id === video.category)?.label}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Play className="w-3 h-3" /> {video.views}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-muted-foreground text-lg">
                No videos found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full -ml-36 -mb-36 blur-3xl opacity-50" />
        <div className="container-max text-center relative z-10">
          <h2 className="text-white mb-6">Stay Informed on Instagram</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Follow Dr. Darshana Reddy for daily tips, live Q&A sessions, and the
            latest in internal medicine and lifestyle wellness.
          </p>
          <a
            href="https://instagram.com/your_lifestyle_doctor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl group"
          >
            <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Follow @your_lifestyle_doctor
          </a>
        </div>
      </section>

      <VideoModal
        isOpen={!!selectedVideo}
        videoUrl={selectedVideo?.url || ""}
        videoTitle={selectedVideo?.title || ""}
        thumbnail={selectedVideo?.thumbnail}
        onClose={() => setSelectedVideo(null)}
      />
    </Layout>
  );
}
