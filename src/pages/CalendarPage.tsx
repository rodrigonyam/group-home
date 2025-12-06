import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  
  // Mock activities data
  const activities = [
    {
      id: '1',
      title: 'Morning Exercise',
      time: '9:00 AM',
      endTime: '10:00 AM',
      location: 'Recreation Room',
      participants: 8,
      maxParticipants: 12,
      date: format(today, 'yyyy-MM-dd'),
      category: 'exercise',
      description: 'Gentle stretching and light exercises',
    },
    {
      id: '2',
      title: 'Breakfast',
      time: '8:00 AM',
      endTime: '9:30 AM',
      location: 'Dining Hall',
      participants: 24,
      date: format(today, 'yyyy-MM-dd'),
      category: 'meal',
      description: 'Continental breakfast with fresh fruit',
    },
    {
      id: '3',
      title: 'Bingo Game',
      time: '2:00 PM',
      endTime: '3:30 PM',
      location: 'Activity Center',
      participants: 12,
      maxParticipants: 16,
      date: format(today, 'yyyy-MM-dd'),
      category: 'game',
      description: 'Weekly bingo with prizes',
    },
    {
      id: '4',
      title: 'Lunch',
      time: '12:30 PM',
      endTime: '1:30 PM',
      location: 'Dining Hall',
      participants: 28,
      date: format(today, 'yyyy-MM-dd'),
      category: 'meal',
      description: 'Hot lunch with daily specials',
    },
    {
      id: '5',
      title: 'Music Therapy',
      time: '3:00 PM',
      endTime: '4:00 PM',
      location: 'Music Room',
      participants: 6,
      maxParticipants: 10,
      date: format(addDays(today, 1), 'yyyy-MM-dd'),
      category: 'therapy',
      description: 'Sing-along and musical activities',
    },
  ];

  const getActivitiesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return activities.filter(activity => activity.date === dateStr);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      exercise: 'bg-green-500',
      meal: 'bg-orange-500', 
      game: 'bg-purple-500',
      therapy: 'bg-blue-500',
      social: 'bg-pink-500',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    return category === 'exercise' ? '🏃‍♀️' : 
           category === 'meal' ? '🍽️' :
           category === 'game' ? '🎲' :
           category === 'therapy' ? '🎵' : '👥';
  };

  const weekDays = [];
  const startDate = startOfWeek(selectedDate);
  
  for (let i = 0; i < 7; i++) {
    weekDays.push(addDays(startDate, i));
  }

  const selectedActivities = getActivitiesForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-3 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors"
          >
            <HomeIcon className="h-8 w-8" />
          </Link>
          <div>
            <h1 className="text-3xl-senior font-bold text-gray-900 flex items-center">
              <CalendarIcon className="h-10 w-10 mr-3 text-blue-600" />
              Calendar
            </h1>
            <p className="text-lg-senior text-gray-600">
              Your daily activities and events
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl-senior font-bold text-gray-800">
            {format(today, 'MMMM yyyy')}
          </div>
          <div className="text-lg-senior text-gray-600">
            Today is {format(today, 'EEEE do')}
          </div>
        </div>
      </div>

      {/* Week View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl-senior font-semibold text-gray-900">
            This Week
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRightIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, selectedDate);
            const dayActivities = getActivitiesForDate(day);
            
            return (
              <motion.button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-4 rounded-xl transition-all duration-200 text-center min-h-[100px]
                  ${isSelected 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : isToday 
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                <div className="text-sm-senior font-medium mb-1">
                  {format(day, 'EEE')}
                </div>
                <div className="text-2xl-senior font-bold mb-2">
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayActivities.slice(0, 2).map((activity) => (
                    <div
                      key={activity.id}
                      className={`w-full h-2 rounded-full ${
                        isSelected ? 'bg-white bg-opacity-50' : getCategoryColor(activity.category)
                      }`}
                    />
                  ))}
                  {dayActivities.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayActivities.length - 2} more
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Day Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
          {isSameDay(selectedDate, today) ? 'Today\'s Activities' : `Activities for ${format(selectedDate, 'EEEE, MMMM do')}`}
        </h2>

        {selectedActivities.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl-senior font-medium text-gray-900 mb-2">
              No activities scheduled
            </h3>
            <p className="text-lg-senior text-gray-600">
              Enjoy a relaxing day!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedActivities
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center space-x-6 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {/* Category Icon */}
                <div className={`p-4 ${getCategoryColor(activity.category)} rounded-xl`}>
                  <span className="text-3xl">
                    {getCategoryIcon(activity.category)}
                  </span>
                </div>

                {/* Activity Details */}
                <div className="flex-1">
                  <h3 className="text-xl-senior font-semibold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-base-senior text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-5 w-5" />
                      <span>{activity.time} - {activity.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserGroupIcon className="h-5 w-5" />
                      <span>
                        {activity.participants} people
                        {activity.maxParticipants && ` (max ${activity.maxParticipants})`}
                      </span>
                    </div>
                  </div>
                  {activity.description && (
                    <p className="text-base-senior text-gray-600 mt-2">
                      {activity.description}
                    </p>
                  )}
                </div>

                {/* Join Button */}
                <div>
                  {activity.maxParticipants && activity.participants < activity.maxParticipants ? (
                    <button className="btn-primary">
                      Join Activity
                    </button>
                  ) : (
                    <span className="text-lg-senior text-green-600 font-medium">
                      ✓ Participating
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <Link to="/" className="btn-secondary text-center">
          <HomeIcon className="h-6 w-6 mx-auto mb-2" />
          Back to Home
        </Link>
        <button 
          className="btn-primary text-center"
          onClick={() => alert('Activity suggestions feature coming soon!')}
        >
          <CalendarIcon className="h-6 w-6 mx-auto mb-2" />
          Suggest New Activity
        </button>
      </motion.div>
    </div>
  );
};

export default CalendarPage;