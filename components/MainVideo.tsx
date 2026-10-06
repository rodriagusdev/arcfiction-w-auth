import axios from 'axios';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Video } from '../types';

const videoOptions = {
  height: '600px',
  width: '100%',
  playerVars: {
    autoplay: 1,
    controls: 1,
    rel: 0,
    showinfo: 0,
    mute: 1,
    loop: 1,
  },
};

interface MainVideoProps {
  media: string | number | undefined | null;
  type?: 'tv' | 'movie';
}

export default function MainVideo({ media, type = 'tv' }: MainVideoProps) {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!media) {
      setLoading(false);
      return;
    }

    const fetchMainVideo = async () => {
      try {
        const res = await axios.get<Video[]>(`/api/videos?id=${media}&type=${type}`);
        const videos = res.data || [];
        if (videos.length > 0) {
          setVideo(videos[0]);
        }
      } catch (error) {
        console.error('Error fetching trailer video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMainVideo();
  }, [media, type]);

  if (loading) return <div className="text-center py-4 text-slate-400">Loading Video...</div>;
  if (!video) return null;

  return (
    <div className="w-full">
      <YouTube title={video.name || ''} videoId={video.key} id={video.id} opts={videoOptions} />
    </div>
  );
}
