import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Movie } from '../models/types';
import { useColors } from '../theme';
import { Icon } from './Icon';

interface PosterProps {
  movie: Movie;
  size?: 'small' | 'large';
}

export function Poster({ movie, size = 'large' }: PosterProps) {
  return (
    <View
      style={{ backgroundColor: movie.color }}
      className={`aspect-[2/3] justify-end overflow-hidden rounded-2xl ${size === 'small' ? 'w-16' : 'w-full'}`}
    >
      <Text
        className={`absolute font-black text-white/20 ${
          size === 'small' ? 'left-2 top-1 text-4xl' : 'left-3 top-2 text-7xl'
        }`}
      >
        {movie.title.charAt(0)}
      </Text>
      {size === 'large' ? (
        <View className="bg-black/40 p-3">
          <Text className="font-bold text-white" numberOfLines={2}>
            {movie.title}
          </Text>
          <Text className="mt-1 text-xs text-neutral-200">{movie.genres.join(' · ')}</Text>
        </View>
      ) : null}
    </View>
  );
}

interface PosterCardProps {
  movie: Movie;
  onPress?: () => void;
}

export function PosterCard({ movie, onPress }: PosterCardProps) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} className="mr-3 w-36" accessibilityLabel={movie.title}>
      <Poster movie={movie} />
      <View className="mt-2 flex-row items-center">
        <Icon name="star" size={14} color={colors.star} />
        <Text className="ml-1 text-xs text-neutral-700 dark:text-neutral-300">{movie.score.toFixed(1)}</Text>
        <Text className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">{movie.durationMin} min</Text>
      </View>
    </Pressable>
  );
}
