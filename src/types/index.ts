// User types
export interface User {
  id: string;
  name: string;
  photo?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    highContrast: boolean;
    voiceEnabled: boolean;
    notifications: boolean;
  };
  room?: string;
  joinDate: Date;
  medicalInfo?: {
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
  };
}

// Reminder types
export interface Reminder {
  id: string;
  userId: string;
  type: 'medication' | 'meal' | 'activity' | 'appointment' | 'custom';
  title: string;
  description?: string;
  time: string; // HH:mm format
  days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  isActive: boolean;
  isRecurring: boolean;
  sound?: string;
  createdAt: Date;
  lastTriggered?: Date;
}

// Activity types
export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants?: number;
  currentParticipants: string[]; // User IDs
  category: 'social' | 'exercise' | 'entertainment' | 'health' | 'educational' | 'spiritual';
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: Date;
  };
  createdBy: string; // Staff member ID
}

// Chat types
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto?: string;
  content: string;
  type: 'text' | 'image' | 'audio' | 'video';
  timestamp: Date;
  readBy: string[]; // User IDs who have read the message
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'group' | 'family' | 'staff' | 'direct';
  participants: string[]; // User IDs
  lastMessage?: ChatMessage;
  createdAt: Date;
  isArchived: boolean;
}

// Health types
export interface WellnessCheckIn {
  id: string;
  userId: string;
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5; // 1 = very sad, 5 = very happy
  painLevel: 0 | 1 | 2 | 3 | 4 | 5; // 0 = no pain, 5 = severe pain
  sleepQuality: 1 | 2 | 3 | 4 | 5; // 1 = very poor, 5 = excellent
  notes?: string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
  };
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: 'staff' | 'family' | 'medical' | 'emergency';
  phone: string;
  email?: string;
  availability: string;
  priority: number;
}

// Entertainment types
export interface Game {
  id: string;
  name: string;
  description: string;
  category: 'puzzle' | 'memory' | 'word' | 'math' | 'trivia' | 'card';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  instructions: string;
  accessible: boolean;
}

export interface MediaContent {
  id: string;
  title: string;
  type: 'music' | 'audiobook' | 'podcast' | 'radio';
  url?: string;
  duration?: number;
  genre?: string;
  description?: string;
  thumbnail?: string;
}

// Staff types
export interface StaffMember {
  id: string;
  name: string;
  role: 'caregiver' | 'nurse' | 'manager' | 'maintenance' | 'activities';
  phone: string;
  email?: string;
  shift: 'morning' | 'afternoon' | 'evening' | 'night';
  isOnDuty: boolean;
  photo?: string;
}

// Settings types
export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
  voiceEnabled: boolean;
  textToSpeech: boolean;
  largeButtons: boolean;
  simplifiedInterface: boolean;
}

export interface NotificationSettings {
  reminders: boolean;
  activities: boolean;
  messages: boolean;
  emergency: boolean;
  sound: boolean;
  vibration: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation types
export interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  phase: number; // Which phase this feature belongs to
  accessLevel: 'resident' | 'family' | 'staff' | 'admin';
}