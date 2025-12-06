import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  BellIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  HeartIcon,
  MusicalNoteIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/userStore';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useUserStore();

  const navigation = [
    // Phase 1: Foundation
    { name: 'Home', href: '/', icon: HomeIcon, phase: 1 },
    { name: 'My Profile', href: '/profile', icon: UserIcon, phase: 1 },
    { name: 'Reminders', href: '/reminders', icon: BellIcon, phase: 1 },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, phase: 1 },
    
    // Phase 2: Social & Community (disabled for now)
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon, phase: 2, disabled: true },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon, phase: 2, disabled: true },
    
    // Phase 3: Health & Safety (disabled for now)
    { name: 'Health', href: '/health', icon: HeartIcon, phase: 3, disabled: true },
    { name: 'Emergency', href: '/emergency', icon: ExclamationTriangleIcon, phase: 3, disabled: true },
    
    // Phase 4: Entertainment (disabled for now)
    { name: 'Entertainment', href: '/entertainment', icon: MusicalNoteIcon, phase: 4, disabled: true },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl-senior font-bold text-primary-700">
          Group Home
        </h1>
        <p className="text-sm-senior text-gray-600 mt-1">
          Welcome back, {currentUser?.name || 'User'}!
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const isDisabled = item.disabled;
            
            const baseClasses = "nav-item w-full justify-start";
            const activeClasses = isActive ? "nav-item-active" : "";
            const disabledClasses = isDisabled ? "opacity-50 cursor-not-allowed" : "";
            
            const classes = `${baseClasses} ${activeClasses} ${disabledClasses}`;

            if (isDisabled) {
              return (
                <div
                  key={item.name}
                  className={classes}
                  title="Coming soon!"
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.name}</span>
                  <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Phase {item.phase}
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={classes}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
                {item.phase > 1 && (
                  <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Phase {item.phase}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Emergency Button */}
      <div className="absolute bottom-6 left-3 right-3">
        <button
          className="btn-emergency w-full"
          onClick={() => {
            // This will be implemented in Phase 3
            alert('Emergency feature coming in Phase 3!');
          }}
          disabled
        >
          <ExclamationTriangleIcon className="h-8 w-8 mr-2" />
          Emergency Help
        </button>
      </div>
    </div>
  );
};

export default Sidebar;