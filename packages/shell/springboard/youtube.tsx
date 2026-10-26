import { Screen, Text } from '@doan-labs/duo-uikit'
import type { Os } from '@doan-labs/duo-sdk'
import * as stylex from '@stylexjs/stylex'
import { useState, type FormEvent } from 'react'
import { openExternal } from '../native.ts'
import { styles } from './youtube.stylex.ts'

type Video = { id: string; title: string; channel: string; views: string; age: string; duration: string }

const VIDEOS: Video[] = [
  { id: 'jNQXAC9IVRw', title: 'Me at the zoo', channel: 'jawed', views: '370M views', age: '19 years ago', duration: '0:19' },
  { id: 'aqz-KE-bpKQ', title: 'Big Buck Bunny — animated short film', channel: 'Blender', views: '20M views', age: '15 years ago', duration: '9:56' },
  { id: 'LXb3EKWsInQ', title: 'Beautiful Costa Rica in 4K', channel: 'Jacob + Katie Schwarz', views: '48M views', age: '8 years ago', duration: '4:00' },
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', channel: 'Rick Astley', views: '1.6B views', age: '15 years ago', duration: '3:33' },
  { id: 'ScMzIvxBSi4', title: 'Relaxing music for your day', channel: 'YouTube Mix', views: '12M views', age: '2 years ago', duration: '1:00:00' }
]

const FILTERS = ['All', 'Music', 'Gaming', 'Live', 'Animation', 'Mixes', 'Recently uploaded']

const YouTubePlayer = ({ video, onClose }: { video: Video; onClose: () => void }) => (
  <div {...stylex.props(styles.playerLayer)}>
    <div {...stylex.props(styles.playerHeader)}>
      <button type="button" {...stylex.props(styles.backButton)} onClick={onClose} aria-label="Back to videos">‹</button>
      <strong>YouTube</strong>
      <span {...stylex.props(styles.playerSpacer)} />
      <button type="button" {...stylex.props(styles.iconButton)} onClick={() => void openExternal(`https://www.youtube.com/watch?v=${video.id}`)} aria-label="Open on YouTube">↗</button>
    </div>
    <div {...stylex.props(styles.playerFrame)}>
      <iframe
        title={video.title}
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
    <div {...stylex.props(styles.playerDetails)}>
      <h2 {...stylex.props(styles.videoTitle)}>{video.title}</h2>
      <p {...stylex.props(styles.metadata)}>{video.views} · {video.age}</p>
      <div {...stylex.props(styles.channelRow)}>
        <div {...stylex.props(styles.avatar)}>{video.channel.slice(0, 1).toUpperCase()}</div>
        <div {...stylex.props(styles.channelInfo)}>
          <strong>{video.channel}</strong>
          <span>Video on YouTube</span>
        </div>
        <button type="button" {...stylex.props(styles.subscribe)} onClick={() => void openExternal(`https://www.youtube.com/channel?sub_confirmation=1`)}>Subscribe</button>
      </div>
      <p {...stylex.props(styles.description)}>You're watching a real YouTube video inside the Duo iPhone simulator. Playback is provided by YouTube.</p>
    </div>
  </div>
)

export const YouTube = (_props: { os: Os }) => {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [playing, setPlaying] = useState<Video | null>(null)

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const q = query.trim()
    if (q) void openExternal(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`)
  }

  return (
    <Screen xstyle={[styles.screen]}>
      <div {...stylex.props(styles.topBar)}>
        <div {...stylex.props(styles.brand)}>
          <span {...stylex.props(styles.logo)}><span {...stylex.props(styles.playMark)} /></span>
          <strong>YouTube</strong>
          <span {...stylex.props(styles.region)}>SG</span>
        </div>
        <button type="button" {...stylex.props(styles.iconButton)} aria-label="Open YouTube" onClick={() => void openExternal('https://www.youtube.com/')}>↗</button>
      </div>
      <form {...stylex.props(styles.searchRow)} onSubmit={search}>
        <input
          {...stylex.props(styles.searchInput)}
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search YouTube"
          aria-label="Search YouTube"
          enterKeyHint="search"
        />
        <button type="submit" {...stylex.props(styles.searchButton)} aria-label="Search">⌕</button>
      </form>
      <div {...stylex.props(styles.filters)} aria-label="Video categories">
        {FILTERS.map((name) => (
          <button key={name} type="button" {...stylex.props(styles.filter, filter === name && styles.filterSelected)} onClick={() => setFilter(name)}>
            {name}
          </button>
        ))}
      </div>
      <div {...stylex.props(styles.feed)}>
        {VIDEOS.map((video, index) => (
          <button key={video.id} type="button" {...stylex.props(styles.videoCard)} onClick={() => setPlaying(video)}>
            <div {...stylex.props(styles.thumbnailWrap)}>
              <img {...stylex.props(styles.thumbnail)} src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading={index > 1 ? 'lazy' : 'eager'} />
              <span {...stylex.props(styles.duration)}>{video.duration}</span>
            </div>
            <div {...stylex.props(styles.videoInfo)}>
              <div {...stylex.props(styles.avatar)}>{video.channel.slice(0, 1).toUpperCase()}</div>
              <div {...stylex.props(styles.videoCopy)}>
                <span {...stylex.props(styles.cardTitle)}>{video.title}</span>
                <span {...stylex.props(styles.metadata)}>{video.channel}</span>
                <span {...stylex.props(styles.metadata)}>{video.views} · {video.age}</span>
              </div>
              <span {...stylex.props(styles.more)}>⋮</span>
            </div>
          </button>
        ))}
        <div {...stylex.props(styles.footerNote)}>
          <Text size="caption">Demo feed · Select a video to play it, or search to open YouTube results.</Text>
        </div>
      </div>
      <div {...stylex.props(styles.bottomBar)}>
        <button type="button" {...stylex.props(styles.navItem, styles.navActive)} onClick={() => { setPlaying(null); setFilter('All') }}><span>⌂</span><small>Home</small></button>
        <button type="button" {...stylex.props(styles.navItem)} onClick={() => void openExternal('https://www.youtube.com/shorts')}><span>▣</span><small>Shorts</small></button>
        <button type="button" {...stylex.props(styles.createButton)} onClick={() => void openExternal('https://www.youtube.com/')} aria-label="YouTube"><span>＋</span></button>
        <button type="button" {...stylex.props(styles.navItem)} onClick={() => void openExternal('https://www.youtube.com/feed/subscriptions')}><span>▤</span><small>Subscriptions</small></button>
        <button type="button" {...stylex.props(styles.navItem)} onClick={() => void openExternal('https://www.youtube.com/account')}><span>●</span><small>You</small></button>
      </div>
      {playing && <YouTubePlayer video={playing} onClose={() => setPlaying(null)} />}
    </Screen>
  )
}
