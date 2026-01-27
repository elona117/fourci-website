
export interface NavItem {
  label: string;
  path: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  suffix: string;
}

export interface Resource {
  id: string;
  title: string;
  status: 'Ongoing' | 'Completed';
  location: string;
  description: string;
  content: string; // The "Explore More" long-form content
  image: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  isCustom?: boolean; // Flag for resources added via the Admin Dashboard
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  category: 'Leadership' | 'Field Staff' | 'Volunteer';
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
}
