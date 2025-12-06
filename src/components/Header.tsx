import React from 'react';
import { format } from 'date-fns';
import { BellIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/userStore';

const Header: React.FC = () => {
  const { currentUser, logout } = useUserStore();
  const currentTime = new Date();
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    return hour >= 6 && hour < 18 ? SunIcon : MoonIcon;
  };

  const TimeIcon = getTimeIcon();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Time and greeting */}
        <div className="flex items-center space-x-4">
          <TimeIcon className="h-8 w-8 text-yellow-500" />
          <div>
            <h2 className="text-xl-senior font-semibold text-gray-900">
              {getGreeting()}!
            </h2>
            <p className="text-base-senior text-gray-600">
              {format(currentTime, 'EEEE, MMMM do, yyyy')}
            </p>
          </div>
        </div>

        {/* Current time */}
        <div className="text-center">
          <div className="text-3xl-senior font-bold text-primary-700">
            {format(currentTime, 'h:mm a')}
          </div>
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            className="p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Notifications"
          >
            <BellIcon className="h-7 w-7" />
          </button>

          {/* User profile */}
          <div className="flex items-center space-x-3">
            {currentUser?.photo ? (
              <img
                src={currentUser.photo}
                alt={`${currentUser.name}'s photo`}
                className="h-12 w-12 rounded-full object-cover border-2 border-primary-200"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-lg-senior font-semibold text-primary-700">
                  {currentUser?.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            
            <div className="text-right">
              <p className="text-base-senior font-medium text-gray-900">
                {currentUser?.name || 'User'}
              </p>
              <button
                onClick={logout}
                className="text-sm-senior text-gray-500 hover:text-primary-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;