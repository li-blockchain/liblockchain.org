import { useState } from 'react'

interface VideoEmbedProps {
  youtubeId: string
  title: string
  duration?: string | null
}

// Facade pattern: render only the thumbnail until the user clicks play,
// so a page full of videos doesn't load a page full of YouTube iframes.
export default function VideoEmbed({ youtubeId, title, duration }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="group relative block w-full aspect-video rounded-lg overflow-hidden bg-brand-slate-900"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

      {duration && (
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
          {duration}
        </span>
      )}
    </button>
  )
}
