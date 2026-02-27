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

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
    thumbnail: string;
  } | null>(null);

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
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DVAbDs0CRsz/DVAbDs0CRsz-cover.jpg",
      views: "2.5K",
    },
    {
      id: 2,
      title: "Respiratory Health in Monsoons",
      category: "respiratory",
      url: "https://www.instagram.com/reel/DUkiQLrEjOG/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DUkiQLrEjOG/DUkiQLrEjOG-cover.jpg",
      views: "1.8K",
    },
    {
      id: 3,
      title: "Lifestyle Changes for Better Health",
      category: "lifestyle",
      url: "https://www.instagram.com/reel/DSjdSVOkUcM/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DSjdSVOkUcM/DSjdSVOkUcM-cover.jpg",
      views: "3.2K",
    },
    {
      id: 4,
      title: "Asthma Management Guide",
      category: "health-tips",
      url: "https://www.instagram.com/reel/DSZwnNAEtHN/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DSZwnNAEtHN/DSZwnNAEtHN-cover.jpg",
      views: "2.1K",
    },
    {
      id: 5,
      title: "Media Interview - Health Talk",
      category: "media",
      url: "https://www.instagram.com/reel/DR4VCpvkvUw/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DR4VCpvkvUw/DR4VCpvkvUw-cover.jpg",
      views: "4.5K",
    },
    {
      id: 6,
      title: "Preventive Healthcare Tips",
      category: "health-tips",
      url: "https://www.instagram.com/reel/DQJkpikEfDC/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DQJkpikEfDC/DQJkpikEfDC-cover.jpg",
      views: "2.9K",
    },
    {
      id: 7,
      title: "Diabetes Prevention Programs",
      category: "diabetes",
      url: "https://www.instagram.com/reel/DM9wI_XJ-A-/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DM9wI_XJ-A-/DM9wI_XJ-A--cover.jpg",
      views: "3.4K",
    },
    {
      id: 8,
      title: "Respiratory Care During Viral Season",
      category: "respiratory",
      url: "https://www.instagram.com/reel/DMziY45RBcp/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DMziY45RBcp/DMziY45RBcp-cover.jpg",
      views: "2.7K",
    },
    {
      id: 9,
      title: "Healthy Lifestyle Q&A",
      category: "lifestyle",
      url: "https://www.instagram.com/reel/DMkoRzEyNrz/",
      thumbnail:
        "https://inst-1.cdn.yoo-ai.com/cdn-cgi/image/width=540,height=960,fit=cover/reel/DMkoRzEyNrz/DMkoRzEyNrz-cover.jpg",
      views: "1.9K",
    },
  ];

  const filteredVideos =
    activeCategory === "all"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container-max">
          <h1 className="text-white mb-4 animate-slide-up">
            Videos & Education
          </h1>
          <p className="text-lg text-primary-foreground/90 animate-slide-up">
            Watch expert insights on diabetes management, respiratory health,
            and lifestyle wellness
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-max">
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            {categories.map((category, idx) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
                  activeCategory === category.id
                    ? "bg-accent text-accent-foreground shadow-lg scale-105"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200",
                )}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, idx) => (
              <div
                key={video.id}
                className="group cursor-pointer animate-slide-up"
                onClick={() =>
                  setSelectedVideo({
                    url: video.url,
                    title: video.title,
                    thumbnail: video.thumbnail,
                  })
                }
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden bg-gray-200 aspect-[9/16]">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600" />
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Play className="w-7 h-7 text-primary group-hover:text-white fill-primary group-hover:fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        <Instagram className="w-3 h-3" /> Watch Reel
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                        {categories.find((c) => c.id === video.category)?.label}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        {video.views} views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-muted-foreground text-lg">
                No videos found in this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full -ml-36 -mb-36" />
        <div className="container-max text-center relative z-10">
          <h2 className="text-white mb-4 animate-slide-up">
            Follow for More Content
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 animate-slide-up">
            Stay updated with daily health tips, medical insights, and lifestyle
            advice
          </p>
          <a
            href="https://instagram.com/your_lifestyle_doctor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:opacity-90 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up"
          >
            <Instagram className="w-5 h-5" />
            Follow @your_lifestyle_doctor
          </a>
        </div>
      </section>

      {/* Video Modal */}
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
