import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  HomeIcon,
  UserCircleIcon,
  PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';

interface Contact {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  isAvailable: boolean;
  hasVideo: boolean;
  lastCalled?: Date;
  favoriteTime?: string;
}

const CallPage: React.FC = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const contacts: Contact[] = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      phoneNumber: '(555) 123-4567',
      isAvailable: true,
      hasVideo: true,
      lastCalled: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      favoriteTime: 'Evenings (6-8 PM)',
    },
    {
      id: 'mike',
      name: 'Mike Johnson',
      relationship: 'Son',
      phoneNumber: '(555) 987-6543',
      isAvailable: false,
      hasVideo: true,
      lastCalled: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      favoriteTime: 'Weekends',
    },
    {
      id: 'emily',
      name: 'Emily Roberts',
      relationship: 'Granddaughter',
      phoneNumber: '(555) 456-7890',
      isAvailable: true,
      hasVideo: true,
      favoriteTime: 'After school (4-6 PM)',
    },
    {
      id: 'doctor',
      name: 'Dr. Williams',
      relationship: 'Doctor',
      phoneNumber: '(555) 111-2222',
      isAvailable: true,
      hasVideo: false,
      favoriteTime: 'Business hours',
    },
    {
      id: 'emergency',
      name: 'Emergency Services',
      relationship: 'Emergency',
      phoneNumber: '911',
      isAvailable: true,
      hasVideo: false,
    },
  ];

  const startCall = (contact: Contact, withVideo = false) => {
    setSelectedContact(contact);
    setIsInCall(true);
    setIsVideoEnabled(withVideo && contact.hasVideo);
    setCallDuration(0);

    // Simulate call duration counting
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Auto-end call after demo
    setTimeout(() => {
      endCall();
      clearInterval(interval);
    }, 15000); // End after 15 seconds for demo
  };

  const endCall = () => {
    setIsInCall(false);
    setSelectedContact(null);
    setCallDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable ? 'text-green-600' : 'text-gray-400';
  };

  const getAvailabilityText = (isAvailable: boolean) => {
    return isAvailable ? 'Available' : 'Busy';
  };

  if (isInCall && selectedContact) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        {/* Call Header */}
        <div className="p-6 text-center text-white">
          <h2 className="text-2xl-senior font-semibold mb-2">
            {selectedContact.name}
          </h2>
          <p className="text-lg-senior text-gray-300">
            {selectedContact.relationship} • {formatDuration(callDuration)}
          </p>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-black rounded-t-3xl mx-4 overflow-hidden">
          {isVideoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <UserCircleIcon className="h-32 w-32 mx-auto mb-4 opacity-50" />
                <p className="text-xl-senior">Video call with {selectedContact.name}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <UserCircleIcon className="h-32 w-32 mx-auto mb-4" />
                <p className="text-2xl-senior font-semibold mb-2">{selectedContact.name}</p>
                <p className="text-lg-senior text-gray-300">Audio call</p>
              </div>
            </div>
          )}

          {/* Small self video preview */}
          {isVideoEnabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 w-32 h-24 bg-gray-700 rounded-xl overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <span className="text-white text-sm">You</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Call Controls */}
        <div className="p-8 bg-white rounded-t-3xl">
          <div className="flex items-center justify-center space-x-6">
            {/* Mute Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-4 rounded-full ${
                isAudioEnabled 
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-red-500 text-white'
              }`}
            >
              <MicrophoneIcon className="h-8 w-8" />
            </motion.button>

            {/* End Call Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={endCall}
              className="p-6 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <PhoneIcon className="h-10 w-10" />
            </motion.button>

            {/* Video Toggle Button */}
            {selectedContact.hasVideo && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className={`p-4 rounded-full ${
                  isVideoEnabled 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {isVideoEnabled ? (
                  <VideoCameraIcon className="h-8 w-8" />
                ) : (
                  <VideoCameraSlashIcon className="h-8 w-8" />
                )}
              </motion.button>
            )}

            {/* Speaker Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              <SpeakerWaveIcon className="h-8 w-8" />
            </motion.button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-lg-senior text-gray-600">
              Call controls: Tap to mute, end call, or toggle video
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
              <PhoneIcon className="h-10 w-10 mr-3 text-green-600" />
              Call Family & Friends
            </h1>
            <p className="text-lg-senior text-gray-600">
              Stay connected with your loved ones
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Call Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-red-50 border-2 border-red-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl-senior font-semibold text-red-800 mb-2">
              Emergency Services
            </h2>
            <p className="text-base-senior text-red-600">
              For immediate medical assistance
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startCall(contacts.find(c => c.id === 'emergency')!)}
            className="px-8 py-4 bg-red-600 text-white rounded-xl text-xl-senior font-semibold hover:bg-red-700 transition-colors"
          >
            Call 911
          </motion.button>
        </div>
      </motion.div>

      {/* Favorite Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
          Quick Call
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {contacts.slice(0, 4).map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-4">
                <UserCircleIcon className="h-16 w-16 text-gray-400" />
                <div className="flex-1">
                  <h3 className="text-lg-senior font-semibold text-gray-900">
                    {contact.name}
                  </h3>
                  <p className="text-base-senior text-gray-600">
                    {contact.relationship}
                  </p>
                  <p className={`text-sm-senior ${getAvailabilityColor(contact.isAvailable)}`}>
                    {getAvailabilityText(contact.isAvailable)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm-senior text-gray-600">
                  📞 {contact.phoneNumber}
                </p>
                {contact.favoriteTime && (
                  <p className="text-sm-senior text-gray-600">
                    ⏰ Best time: {contact.favoriteTime}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startCall(contact, false)}
                  disabled={!contact.isAvailable}
                  className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Call
                </motion.button>
                
                {contact.hasVideo && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startCall(contact, true)}
                    disabled={!contact.isAvailable}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <VideoCameraIcon className="h-5 w-5 mr-2" />
                    Video
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Calls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
          Recent Calls
        </h2>
        <div className="space-y-4">
          {contacts.filter(c => c.lastCalled).map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <UserCircleIcon className="h-12 w-12 text-gray-400" />
                <div>
                  <h3 className="text-lg-senior font-medium text-gray-900">
                    {contact.name}
                  </h3>
                  <p className="text-base-senior text-gray-600">
                    {contact.lastCalled && new Date(contact.lastCalled).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startCall(contact, false)}
                className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
              >
                <PhoneArrowUpRightIcon className="h-6 w-6" />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <Link to="/messages" className="btn-secondary text-center">
          Messages
        </Link>
        <Link to="/" className="btn-primary text-center">
          <HomeIcon className="h-6 w-6 mx-auto mb-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default CallPage;