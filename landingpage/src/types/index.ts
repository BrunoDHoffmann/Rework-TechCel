export interface ServiceItem {
  id: string;
  title: string;
  category: 'smartphones' | 'games' | 'boards' | 'software' | 'tablets';
  shortDesc: string;
  fullDesc: string;
  turnaroundTime: string;
  warranty?: string;
  symptoms: string[];
  iconName: string;
  popular?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'geral' | 'precos' | 'garantia' | 'aparelhos' | 'qualidade';
}

export interface TestimonialItem {
  id: string;
  name: string;
  device: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  highlight: string;
}

export interface DeviceEstimateOption {
  deviceType: string;
  brands: {
    name: string;
    issues: {
      id: string;
      label: string;
      typicalTime: string;
      tip: string;
    }[];
  }[];
}
