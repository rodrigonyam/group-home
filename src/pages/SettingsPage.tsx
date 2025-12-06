import React from 'react';
import { motion } from 'framer-motion';
import {
  AdjustmentsHorizontalIcon,
  BellIcon,
  EyeIcon,
  SpeakerWaveIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/userStore';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { 
    accessibilitySettings, 
    notificationSettings, 
    updateAccessibilitySettings, 
    updateNotificationSettings 
  } = useUserStore();

  const handleAccessibilityChange = (key: string, value: any) => {
    updateAccessibilitySettings({ [key]: value });
    toast.success('Settings updated successfully!');
  };

  const handleNotificationChange = (key: string, value: any) => {
    updateNotificationSettings({ [key]: value });
    toast.success('Notification settings updated!');
  };

  const fontSizeOptions = [
    { value: 'small', label: 'Small (16px)', description: 'Compact text size' },
    { value: 'medium', label: 'Medium (18px)', description: 'Standard text size' },
    { value: 'large', label: 'Large (20px)', description: 'Comfortable reading' },
    { value: 'extra-large', label: 'Extra Large (24px)', description: 'Maximum readability' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl-senior font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-lg-senior text-gray-600 mt-1">
          Customize your app experience for better accessibility and comfort
        </p>
      </div>

      {/* Accessibility Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <EyeIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl-senior font-semibold text-gray-900">
              Accessibility Settings
            </h2>
            <p className="text-base-senior text-gray-600">
              Adjust the app to better suit your vision and motor needs
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Font Size */}
          <div>
            <label className="block text-lg-senior font-medium text-gray-900 mb-4">
              Text Size
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAccessibilityChange('fontSize', option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    accessibilitySettings.fontSize === option.value
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1" style={{
                    fontSize: option.value === 'small' ? '16px' :
                               option.value === 'medium' ? '18px' :
                               option.value === 'large' ? '20px' : '24px'
                  }}>
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                High Contrast Mode
              </h3>
              <p className="text-base-senior text-gray-600">
                Use darker colors and stronger borders for better visibility
              </p>
            </div>
            <button
              onClick={() => handleAccessibilityChange('highContrast', !accessibilitySettings.highContrast)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                accessibilitySettings.highContrast ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.highContrast ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Reduce Motion
              </h3>
              <p className="text-base-senior text-gray-600">
                Minimize animations and transitions
              </p>
            </div>
            <button
              onClick={() => handleAccessibilityChange('reducedMotion', !accessibilitySettings.reducedMotion)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                accessibilitySettings.reducedMotion ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.reducedMotion ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Large Buttons */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Large Touch Targets
              </h3>
              <p className="text-base-senior text-gray-600">
                Make buttons and links larger and easier to tap
              </p>
            </div>
            <button
              onClick={() => handleAccessibilityChange('largeButtons', !accessibilitySettings.largeButtons)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                accessibilitySettings.largeButtons ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.largeButtons ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Voice Support */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Voice Support
              </h3>
              <p className="text-base-senior text-gray-600">
                Enable voice commands and text-to-speech (Coming soon)
              </p>
            </div>
            <button
              disabled
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 opacity-50 cursor-not-allowed"
            >
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-green-100 rounded-lg">
            <BellIcon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl-senior font-semibold text-gray-900">
              Notification Settings
            </h2>
            <p className="text-base-senior text-gray-600">
              Choose what types of notifications you want to receive
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Reminders */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Reminder Notifications
              </h3>
              <p className="text-base-senior text-gray-600">
                Alerts for medications, meals, and activities
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('reminders', !notificationSettings.reminders)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                notificationSettings.reminders ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notificationSettings.reminders ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Activities */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Activity Notifications
              </h3>
              <p className="text-base-senior text-gray-600">
                Updates about upcoming events and activities
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('activities', !notificationSettings.activities)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                notificationSettings.activities ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notificationSettings.activities ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Messages */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Message Notifications
              </h3>
              <p className="text-base-senior text-gray-600">
                New messages from family and friends (Coming in Phase 2)
              </p>
            </div>
            <button
              disabled
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 opacity-50 cursor-not-allowed"
            >
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
            </button>
          </div>

          {/* Emergency */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Emergency Alerts
              </h3>
              <p className="text-base-senior text-gray-600">
                Important safety and emergency notifications (Coming in Phase 3)
              </p>
            </div>
            <button
              disabled
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 opacity-50 cursor-not-allowed"
            >
              <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
            </button>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="text-lg-senior font-medium text-gray-900">
                Sound Notifications
              </h3>
              <p className="text-base-senior text-gray-600">
                Play sounds with notifications
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('sound', !notificationSettings.sound)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                notificationSettings.sound ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notificationSettings.sound ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* About & Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl-senior font-semibold text-gray-900">
              About & Support
            </h2>
            <p className="text-base-senior text-gray-600">
              App information and help resources
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg-senior text-gray-900">App Version</span>
            <span className="text-lg-senior text-gray-600">1.0.0 (Phase 1)</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg-senior text-gray-900">Current Phase</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-base-senior font-medium rounded-full">
              Foundation Complete
            </span>
          </div>

          <div className="pt-4">
            <h3 className="text-lg-senior font-medium text-gray-900 mb-3">
              Coming Soon
            </h3>
            <ul className="space-y-2 text-base-senior text-gray-600">
              <li>• Phase 2: Social features and video calls</li>
              <li>• Phase 3: Health monitoring and emergency features</li>
              <li>• Phase 4: Games and entertainment</li>
              <li>• Phase 5: Staff dashboard and offline mode</li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={() => toast('Support contact information will be available soon!')}
              className="btn-secondary w-full"
            >
              Contact Support
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;