import React from 'react';
import { ColorValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];
type IoniconColor = React.ComponentProps<typeof Ionicons>['color'];

interface IconProps {
  name: IconName;
  size?: number;
  color?: ColorValue;
}

export function Icon({ name, size = 20, color }: IconProps) {
  const colors = useColors();
  return <Ionicons name={name} size={size} color={(color ?? colors.text) as IoniconColor} />;
}
