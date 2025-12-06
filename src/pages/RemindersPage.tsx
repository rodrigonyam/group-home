import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  BellIcon,
  ClockIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/userStore';
import { useReminderStore } from '../stores/reminderStore';
import { Reminder } from '../types';
import toast from 'react-hot-toast';

const RemindersPage: React.FC = () => {
  const { currentUser } = useUserStore();
  const { 
    reminders, 
    addReminder, 
    updateReminder, 
    deleteReminder, 
    toggleReminder,
    getRemindersForUser 
  } = useReminderStore();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [newReminder, setNewReminder] = useState({
    type: 'medication' as const,
    title: '',
    description: '',
    time: '',
    days: [] as string[],
    isRecurring: true,
  });

  const userReminders = currentUser ? getRemindersForUser(currentUser.id) : [];

  const reminderTypes = [
    { value: 'medication', label: 'Medication', icon: '💊' },
    { value: 'meal', label: 'Meal', icon: '🍽️' },
    { value: 'activity', label: 'Activity', icon: '🎯' },
    { value: 'appointment', label: 'Appointment', icon: '👩‍⚕️' },
    { value: 'custom', label: 'Custom', icon: '📝' },
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Monday', short: 'Mon' },
    { value: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { value: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { value: 'thursday', label: 'Thursday', short: 'Thu' },
    { value: 'friday', label: 'Friday', short: 'Fri' },
    { value: 'saturday', label: 'Saturday', short: 'Sat' },
    { value: 'sunday', label: 'Sunday', short: 'Sun' },
  ];

  const handleAddReminder = () => {
    if (!currentUser) return;

    if (newReminder.title && newReminder.time && newReminder.days.length > 0) {
      addReminder({
        ...newReminder,
        userId: currentUser.id,
        isActive: true,
        days: newReminder.days as any,
      });
      
      setNewReminder({
        type: 'medication',
        title: '',
        description: '',
        time: '',
        days: [],
        isRecurring: true,
      });
      setShowAddForm(false);
      toast.success('Reminder added successfully!');
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleDeleteReminder = (id: string) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(id);
      toast.success('Reminder deleted.');
    }
  };

  const handleToggleDay = (day: string) => {
    const days = newReminder.days.includes(day)
      ? newReminder.days.filter(d => d !== day)
      : [...newReminder.days, day];
    setNewReminder({ ...newReminder, days });
  };

  const getReminderTypeInfo = (type: string) => {
    return reminderTypes.find(t => t.value === type) || reminderTypes[0];
  };

  const formatDays = (days: string[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && !days.includes('saturday') && !days.includes('sunday')) {
      return 'Weekdays';
    }
    if (days.length === 2 && days.includes('saturday') && days.includes('sunday')) {
      return 'Weekends';
    }
    return days.map(day => 
      daysOfWeek.find(d => d.value === day)?.short
    ).join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl-senior font-bold text-gray-900">
            My Reminders
          </h1>
          <p className="text-lg-senior text-gray-600 mt-1">
            Manage your daily medication, meal, and activity reminders
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-6 w-6 mr-2" />
          Add Reminder
        </button>
      </div>

      {/* Reminders List */}
      {userReminders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center py-12"
        >
          <BellIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl-senior font-medium text-gray-900 mb-2">
            No reminders yet
          </h3>
          <p className="text-lg-senior text-gray-600 mb-6">
            Create your first reminder to stay on track with your daily routine.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <PlusIcon className="h-6 w-6 mr-2" />
            Create First Reminder
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {userReminders.map((reminder, index) => {
            const typeInfo = getReminderTypeInfo(reminder.type);
            
            return (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card transition-all duration-200 ${
                  reminder.isActive ? 'border-l-4 border-l-green-500' : 'opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-3xl">
                      {typeInfo.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl-senior font-semibold text-gray-900">
                          {reminder.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm-senior font-medium rounded-full">
                          {typeInfo.label}
                        </span>
                      </div>
                      
                      {reminder.description && (
                        <p className="text-base-senior text-gray-600 mb-2">
                          {reminder.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm-senior text-gray-500">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{reminder.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{formatDays(reminder.days)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className={`p-3 rounded-lg transition-colors ${
                        reminder.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                      title={reminder.isActive ? 'Pause reminder' : 'Resume reminder'}
                    >
                      {reminder.isActive ? (
                        <PauseIcon className="h-5 w-5" />
                      ) : (
                        <PlayIcon className="h-5 w-5" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => setEditingReminder(reminder)}
                      className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit reminder"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete reminder"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Reminder Modal */}
      {(showAddForm || editingReminder) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <h2 className="text-2xl-senior font-bold text-gray-900 mb-6">
                {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
              </h2>
              
              <div className="space-y-6">
                {/* Reminder Type */}
                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-3">
                    Type of Reminder
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {reminderTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setNewReminder({ ...newReminder, type: type.value as any })}
                        className={`p-4 rounded-lg border-2 transition-colors text-center ${
                          newReminder.type === type.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm-senior font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Reminder Title *
                  </label>
                  <input
                    type="text"
                    className="input-senior"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    placeholder="e.g., Take morning medication"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    className="input-senior"
                    rows={3}
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    placeholder="Additional details about this reminder"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    className="input-senior"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  />
                </div>

                {/* Days */}
                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-3">
                    Days of the Week *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day.value}
                        onClick={() => handleToggleDay(day.value)}
                        className={`p-3 rounded-lg border-2 transition-colors text-center ${
                          newReminder.days.includes(day.value)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm-senior font-medium">{day.short}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingReminder(null);
                    setNewReminder({
                      type: 'medication',
                      title: '',
                      description: '',
                      time: '',
                      days: [],
                      isRecurring: true,
                    });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReminder}
                  className="btn-primary"
                >
                  {editingReminder ? 'Save Changes' : 'Add Reminder'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RemindersPage;