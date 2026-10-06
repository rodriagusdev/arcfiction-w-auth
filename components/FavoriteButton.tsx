import axios from 'axios';
import React, { useCallback } from 'react';

import { useCurrentUser, useFavorites } from '../hooks';
import { SvgUnlist, SvgList } from './Svgs';
import { FavoriteMedia, Media } from '../types';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  media: Media;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ media }) => {
  const { data, mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const favorites: FavoriteMedia[] = data;

  const isFavorited = favorites?.find((favorited) => {
    return favorited.media_id == media.id.toString();
  });

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorited) {
      toast.loading('Searching in list...');
      response = await axios.post('/api/unmarkasfavorite', { media });
      toast.success('Removed from list!');
    } else {
      toast.loading('Listing...');
      response = await axios.post('/api/markasfavorite', { media });
      if (response) toast.success('Succesfully listed!');
    }

    mutateFavorites();
  }, [isFavorited, media, mutateFavorites]);

  const Icon = isFavorited ? <SvgUnlist /> : <SvgList />;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <div className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6">
        {Icon}
      </div>
    </div>
  );
};

export default FavoriteButton;
