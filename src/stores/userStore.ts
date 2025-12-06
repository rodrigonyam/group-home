import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AccessibilitySettings, NotificationSettings } from '../types';

interface UserState {
  currentUser: User | null;
  accessibilitySettings: AccessibilitySettings;
  notificationSettings: NotificationSettings;
  isLoggedIn: boolean;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  updateAccessibilitySettings: (settings: Partial<AccessibilitySettings>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  login: (user: User) => void;
  logout: () => void;
}

const defaultAccessibilitySettings: AccessibilitySettings = {
  fontSize: 'large',
  highContrast: false,
  reducedMotion: false,
  voiceEnabled: false,
  textToSpeech: false,
  largeButtons: true,
  simplifiedInterface: true,
};

const defaultNotificationSettings: NotificationSettings = {
  reminders: true,
  activities: true,
  messages: true,
  emergency: true,
  sound: true,
  vibration: false,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      accessibilitySettings: defaultAccessibilitySettings,
      notificationSettings: defaultNotificationSettings,
      isLoggedIn: false,

      setCurrentUser: (user) => {
        set({ currentUser: user, isLoggedIn: !!user });
      },

      updateAccessibilitySettings: (settings) => {
        set({
          accessibilitySettings: {
            ...get().accessibilitySettings,
            ...settings,
          },
        });
        
        // Apply settings to document
        const root = document.documentElement;
        const newSettings = { ...get().accessibilitySettings, ...settings };
        
        // Font size
        root.style.fontSize = {
          small: '16px',
          medium: '18px',
          large: '20px',
          'extra-large': '24px',
        }[newSettings.fontSize];
        
        // High contrast
        if (newSettings.highContrast) {
          root.classList.add('high-contrast');
        } else {
          root.classList.remove('high-contrast');
        }
        
        // Reduced motion
        if (newSettings.reducedMotion) {
          root.classList.add('reduce-motion');
        } else {
          root.classList.remove('reduce-motion');
        }
      },

      updateNotificationSettings: (settings) => {
        set({
          notificationSettings: {
            ...get().notificationSettings,
            ...settings,
          },
        });
      },

      login: (user) => {
        set({ currentUser: user, isLoggedIn: true });
      },

      logout: () => {
        set({ currentUser: null, isLoggedIn: false });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        accessibilitySettings: state.accessibilitySettings,
        notificationSettings: state.notificationSettings,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);