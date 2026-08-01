import {
  GraduationCap,
  Award,
  Briefcase,
  Heart,
  Users,
  Globe2,
  Plane,
  MapPin,
  Compass,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  school: GraduationCap,
  award: Award,
  briefcase: Briefcase,
  heart: Heart,
  users: Users,
  globe: Globe2,
  plane: Plane,
  pin: MapPin,
  compass: Compass,
};

interface ServiceIconProps {
  name: string;
  className?: string;
}

export default function ServiceIcon({ name, className = 'w-7 h-7' }: ServiceIconProps) {
  const Icon = ICONS[name] ?? Compass;
  return <Icon className={className} aria-hidden />;
}
