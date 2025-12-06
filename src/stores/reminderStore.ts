import { create } from 'zustand';
import { Reminder } from '../types';

interface ReminderState {
  reminders: Reminder[];
  activeReminders: Reminder[];
  
  // Actions
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;
  markReminderTriggered: (id: string) => void;
  getRemindersForUser: (userId: string) => Reminder[];
  getActiveRemindersForTime: (time: string, day: string) => Reminder[];
}

export const useReminderStore = create<ReminderState>((set, get) => ({
  reminders: [],
  activeReminders: [],

  addReminder: (reminderData) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    set((state) => ({
      reminders: [...state.reminders, newReminder],
      activeReminders: newReminder.isActive 
        ? [...state.activeReminders, newReminder]
        : state.activeReminders,
    }));
  },

  updateReminder: (id, updates) => {
    set((state) => ({
      reminders: state.reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updates } : reminder
      ),
      activeReminders: state.activeReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updates } : reminder
      ),
    }));
  },

  deleteReminder: (id) => {
    set((state) => ({
      reminders: state.reminders.filter((reminder) => reminder.id !== id),
      activeReminders: state.activeReminders.filter((reminder) => reminder.id !== id),
    }));
  },

  toggleReminder: (id) => {
    const { reminders, activeReminders } = get();
    const reminder = reminders.find((r) => r.id === id);
    
    if (reminder) {
      const updatedReminder = { ...reminder, isActive: !reminder.isActive };
      
      set({
        reminders: reminders.map((r) => (r.id === id ? updatedReminder : r)),
        activeReminders: updatedReminder.isActive
          ? [...activeReminders.filter((r) => r.id !== id), updatedReminder]
          : activeReminders.filter((r) => r.id !== id),
      });
    }
  },

  markReminderTriggered: (id) => {
    set((state) => ({
      reminders: state.reminders.map((reminder) =>
        reminder.id === id 
          ? { ...reminder, lastTriggered: new Date() }
          : reminder
      ),
    }));
  },

  getRemindersForUser: (userId) => {
    return get().reminders.filter((reminder) => reminder.userId === userId);
  },

  getActiveRemindersForTime: (time, day) => {
    const currentDay = day.toLowerCase() as any;
    return get().activeReminders.filter((reminder) =>
      reminder.time === time && reminder.days.includes(currentDay)
    );
  },
}));