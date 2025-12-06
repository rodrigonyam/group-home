import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  BellIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  MusicalNoteIcon,
  ExclamationTriangleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/userStore';
import { useReminderStore } from '../stores/reminderStore';

const Dashboard: React.FC = () => {
  const { currentUser } = useUserStore();
  const { getRemindersForUser } = useReminderStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const userReminders = currentUser ? getRemindersForUser(currentUser.id) : [];
  const todayReminders = userReminders.filter(reminder => reminder.isActive);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    const name = currentUser?.name?.split(' ')[0] || 'friend';
    
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 17) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    return hour >= 6 && hour < 18 ? SunIcon : MoonIcon;
  };

  const TimeIcon = getTimeIcon();

  // Social Connection (Top Row)
  const socialButtons = [
    {
      id: 'calendar',
      title: 'Calendar',
      emoji: '📅',
      icon: CalendarIcon,
      description: 'Today\'s Activities',
      color: 'bg-blue-500 hover:bg-blue-600',
      href: '/calendar',
      disabled: false,
      badge: '3 events',
      category: 'social'
    },
    {
      id: 'messages',
      title: 'Messages',
      emoji: '💬',
      icon: ChatBubbleLeftRightIcon,
      description: 'Chat with Family',
      color: 'bg-green-500 hover:bg-green-600',
      href: '/messages',
      disabled: false,
      badge: '2 new',
      category: 'social'
    },
    {
      id: 'call',
      title: 'Call',
      emoji: '📞',
      icon: PhoneIcon,
      description: 'Video Call Family',
      color: 'bg-purple-500 hover:bg-purple-600',
      href: '/call',
      disabled: false,
      badge: 'Ready',
      category: 'social'
    }
  ];

  // Daily Living Support (Bottom Row)
  const dailyLivingButtons = [
    {
      id: 'reminders',
      title: 'Reminders',
      emoji: '💊',
      icon: BellIcon,
      description: 'Medications & More',
      color: 'bg-orange-500 hover:bg-orange-600',
      href: '/reminders',
      disabled: false,
      badge: `${todayReminders.length} today`,
      category: 'daily'
    },
    {
      id: 'music',
      title: 'Entertainment',
      emoji: '🎵',
      icon: MusicalNoteIcon,
      description: 'Music & Games',
      color: 'bg-pink-500 hover:bg-pink-600',
      href: '/entertainment',
      disabled: false,
      badge: '50+ songs',
      category: 'daily'
    },
    {
      id: 'help',
      title: 'Help',
      emoji: '🚨',
      icon: ExclamationTriangleIcon,
      description: 'Emergency & Support',
      color: 'bg-red-600 hover:bg-red-700',
      href: '/emergency',
      disabled: false,
      badge: 'Emergency',
      category: 'daily'
    }
  ];



  const handleButtonClick = (button: any) => {
    if (button.disabled) {
      if (button.id === 'help') {
        alert('Emergency features coming in Phase 3!\n\nFor immediate help, please:\n• Call a caregiver\n• Use the call button at your bedside\n• Contact facility staff');
      } else {
        alert(`${button.title} feature coming soon in Phase ${button.id === 'calendar' ? '2' : button.id === 'messages' || button.id === 'call' ? '2' : '4'}!`);
      }
      return;
    }
    
    // Navigate to the page
    window.location.href = button.href;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header with Time and Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <TimeIcon className="h-12 w-12 text-yellow-500" />
          <div>
            <div className="text-5xl font-bold text-primary-700">
              {format(currentTime, 'h:mm a')}
            </div>
            <div className="text-xl-senior text-gray-600">
              {format(currentTime, 'EEEE, MMMM do')}
            </div>
          </div>
        </div>
        <h1 className="text-3xl-senior font-bold text-gray-800">
          {getGreeting()}
        </h1>
        <p className="text-lg-senior text-gray-600 mt-2">
          What would you like to do today?
        </p>
      </motion.div>

      {/* Main Dashboard */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Social Connection Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl-senior font-bold text-gray-800 mb-2">
              Stay Connected 👥
            </h2>
            <p className="text-lg-senior text-gray-600">
              Connect with family, friends, and activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialButtons.map((button, index) => (
              <motion.button
                key={button.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: button.disabled ? 1 : 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: button.disabled ? 1 : 0.95 
                }}
                onClick={() => handleButtonClick(button)}
                className={`
                  relative p-8 rounded-3xl shadow-xl transition-all duration-300
                  ${button.disabled 
                    ? 'bg-gray-200 cursor-not-allowed opacity-75' 
                    : `${button.color} text-white shadow-2xl hover:shadow-3xl`
                  }
                  min-h-[200px] flex flex-col items-center justify-center
                  border-4 border-white
                `}
              >
                {/* Emoji and Icon */}
                <div className="flex items-center justify-center mb-4">
                  <span className="text-6xl mr-4">{button.emoji}</span>
                  <button.icon className="h-12 w-12" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl-senior font-bold mb-2 text-center">
                  {button.title}
                </h3>
                
                {/* Description */}
                <p className="text-lg-senior opacity-90 text-center mb-3">
                  {button.description}
                </p>
                
                {/* Badge */}
                <div className={`
                  px-4 py-2 rounded-full text-base-senior font-medium
                  ${button.disabled 
                    ? 'bg-gray-300 text-gray-600' 
                    : 'bg-white bg-opacity-20 text-white'
                  }
                `}>
                  {button.badge}
                </div>

                {/* Coming Soon Overlay */}
                {button.disabled && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm-senior font-semibold">
                      Coming Soon
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Daily Living Support Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl-senior font-bold text-gray-800 mb-2">
              Daily Living Support 🏠
            </h2>
            <p className="text-lg-senior text-gray-600">
              Manage your health, entertainment, and safety
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dailyLivingButtons.map((button, index) => (
              <motion.button
                key={button.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (0.1 * index) }}
                whileHover={{ 
                  scale: button.disabled ? 1 : 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: button.disabled ? 1 : 0.95 
                }}
                onClick={() => handleButtonClick(button)}
                className={`
                  relative p-8 rounded-3xl shadow-xl transition-all duration-300
                  ${button.disabled 
                    ? 'bg-gray-200 cursor-not-allowed opacity-75' 
                    : `${button.color} text-white shadow-2xl hover:shadow-3xl`
                  }
                  min-h-[200px] flex flex-col items-center justify-center
                  border-4 border-white
                  ${button.id === 'help' ? 'ring-4 ring-red-200' : ''}
                `}
              >
                {/* Emoji and Icon */}
                <div className="flex items-center justify-center mb-4">
                  <span className="text-6xl mr-4">{button.emoji}</span>
                  <button.icon className="h-12 w-12" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl-senior font-bold mb-2 text-center">
                  {button.title}
                </h3>
                
                {/* Description */}
                <p className="text-lg-senior opacity-90 text-center mb-3">
                  {button.description}
                </p>
                
                {/* Badge */}
                <div className={`
                  px-4 py-2 rounded-full text-base-senior font-medium
                  ${button.disabled 
                    ? 'bg-gray-300 text-gray-600' 
                    : button.id === 'help' 
                      ? 'bg-red-900 bg-opacity-50 text-white' 
                      : 'bg-white bg-opacity-20 text-white'
                  }
                `}>
                  {button.badge}
                </div>

                {/* Coming Soon Overlay */}
                {button.disabled && button.id !== 'help' && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm-senior font-semibold">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Emergency Badge */}
                {button.id === 'help' && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-800 text-white px-3 py-1 rounded-full text-sm-senior font-bold pulse">
                      Phase 3
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Swipe Navigation Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto">
            <p className="text-base-senior text-gray-600 mb-2">
              More features coming soon!
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm-senior text-gray-500">
              <span>←</span>
              <span>Swipe for more apps</span>
              <span>→</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl-senior font-semibold text-gray-800 mb-3">
            Today's Quick Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base-senior">
            <div className="flex items-center justify-center space-x-2">
              <BellIcon className="h-6 w-6 text-orange-500" />
              <span className="text-gray-700">
                {todayReminders.length} reminders today
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CalendarIcon className="h-6 w-6 text-blue-500" />
              <span className="text-gray-700">3 activities scheduled</span>
            </div>
          </div>
          
          {todayReminders.length > 0 && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="text-base-senior text-orange-800 font-medium">
                Next reminder: {todayReminders[0]?.title} at {todayReminders[0]?.time}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;