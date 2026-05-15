export type Platform = 'instagram' | 'twitter' | 'tiktok' | 'linkedin';

export interface Metric {
  label: string;
  value: string | number;
  change: number;
  description: string;
}

export interface PlatformData {
  metrics: Metric[];
  engagementData: { name: string; value: number }[];
  sentiment: string;
  topPosts: { id: string; content: string; engagement: string }[];
}

export interface PostIdea {
  id: string;
  topic: string;
  copy: string;
  visuals: string;
  suggestedTime: string;
}

export interface AppState {
  selectedPlatform: Platform;
  isLoading: boolean;
  aiInsights: string | null;
  postIdeas: PostIdea[];
}
