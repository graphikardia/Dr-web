import { Layout } from "@/components/Layout";
import { useState } from "react";
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
  {
    id: 1,
    title: "Diabetes Management Tips",
    category: "diabetes",
    url: "https://www.instagram.com/reel/DVAbDs0CRsz/",
    thumbnail: "",
    views: "2.5K",
  },
  {
    id: 2,
    title: "Respiratory Health in Monsoons",
    category: "respiratory",
    url: "https://www.instagram.com/reel/DUkiQLrEjOG/",
    thumbnail: "",
    views: "1.8K",
  },
  {
    id: 3,
    title: "Lifestyle Changes for Better Health",
    category: "lifestyle",
    url: "https://www.instagram.com/reel/DSjdSVOkUcM/",
    thumbnail: "",
    views: "3.2K",
  },
  {
    id: 4,
    title: "Asthma Management Guide",
    category: "health-tips",
    url: "https://www.instagram.com/reel/DSZwnNAEtHN/",
    thumbnail: "",
    views: "2.1K",
  },
  {
    id: 5,
    title: "Media Interview - Health Talk",
    category: "media",
    url: "https://www.instagram.com/reel/DR4VCpvkvUw/",
    thumbnail: "",
    views: "4.5K",
  },
  {
    id: 6,
    title: "Preventive Healthcare Tips",
    category: "health-tips",
    url: "https://www.instagram.com/reel/DQJkpikEfDC/",
    thumbnail: "",
    views: "2.9K",
  },
  {
    id: 7,
    title: "Diabetes Prevention Programs",
    category: "diabetes",
    url: "https://www.instagram.com/reel/DM9wI_XJ-A-/",
    thumbnail: "",
    views: "3.4K",
  },
  {
    id: 8,
    title: "Respiratory Care During Viral Season",
    category: "respiratory",
    url: "https://www.instagram.com/reel/DMziY45RBcp/",
    thumbnail: "",
    views: "2.7K",
  },
  {
    id: 9,
    title: "Healthy Lifestyle Q&A",
    category: "lifestyle",
    url: "https://www.instagram.com/reel/DMkoRzEyNrz/",
    thumbnail: "",
    views: "1.9K",
  },
];

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState("all");
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
    return "/placeholder-video.jpg";
  };

  return (
    <Layout>
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
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() =>
                    setSelectedVideo({
                      url: video.url,
                      title: video.title,
                      thumbnail: getInstagramThumbnail(video.url),
                    })
                  }
                >
                  <img
                    src={getInstagramThumbnail(video.url)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.classList.add("bg-gradient-to-br");
                      target.parentElement!.classList.add(
                        categoryGradients[video.category] || "from-primary to-primary/70"
                      );
                    }}
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="w-8 h-8 text-primary group-hover:text-white fill-current" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-white/20">
                      <Instagram className="w-3 h-3" />
                      INSTAGRAM REEL
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                    <span className="text-accent">
                      {categories.find(c => c.id === video.category)?.label}
                    </span>
                    <span className="text-muted-foreground">{video.views} Views</span>
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
              <p className="text-muted-foreground text-lg">No videos found in this category.</p>
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
            Follow Dr. Darshana Reddy for daily tips, live Q&A sessions, and the latest in internal medicine and lifestyle wellness.
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
