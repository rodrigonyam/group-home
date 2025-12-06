import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ExclamationTriangleIcon,
  PhoneIcon,
  ShieldCheckIcon,
  HeartIcon,
  HomeIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';

interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  isAvailable: boolean;
  responseTime: string;
  priority: 'high' | 'medium' | 'low';
}

interface HealthInfo {
  condition: string;
  medication: string;
  allergies: string[];
  emergencyNotes: string;
}

const EmergencyPage: React.FC = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);

  const [countdown, setCountdown] = useState(0);

  const emergencyContacts: EmergencyContact[] = [
    {
      id: 'emergency',
      name: 'Emergency Services',
      role: 'Emergency Response',
      phoneNumber: '911',
      isAvailable: true,
      responseTime: 'Immediate',
      priority: 'high',
    },
    {
      id: 'nurse',
      name: 'Nurse Mary Johnson',
      role: 'On-duty Nurse',
      phoneNumber: '(555) 123-4567',
      isAvailable: true,
      responseTime: '2-5 minutes',
      priority: 'high',
    },
    {
      id: 'doctor',
      name: 'Dr. Williams',
      role: 'Primary Care Doctor',
      phoneNumber: '(555) 987-6543',
      isAvailable: false,
      responseTime: 'Call back within 1 hour',
      priority: 'medium',
    },
    {
      id: 'family',
      name: 'Sarah Johnson',
      role: 'Emergency Contact (Daughter)',
      phoneNumber: '(555) 456-7890',
      isAvailable: true,
      responseTime: 'Usually responds quickly',
      priority: 'medium',
    },
    {
      id: 'administrator',
      name: 'Facility Administrator',
      role: 'Admin on Call',
      phoneNumber: '(555) 111-2222',
      isAvailable: true,
      responseTime: '5-10 minutes',
      priority: 'low',
    },
  ];

  const healthInfo: HealthInfo = {
    condition: 'Hypertension, Type 2 Diabetes',
    medication: 'Lisinopril 10mg daily, Metformin 500mg twice daily',
    allergies: ['Penicillin', 'Shellfish'],
    emergencyNotes: 'Uses hearing aid in right ear. Prefers large print materials.',
  };

  const emergencyTypes = [
    { id: 'medical', name: 'Medical Emergency', icon: '🏥', color: 'bg-red-600', description: 'Chest pain, breathing problems, severe injury' },
    { id: 'fall', name: 'Fall or Injury', icon: '🩹', color: 'bg-orange-600', description: 'Slipped, fell, or hurt yourself' },
    { id: 'feeling-unwell', name: 'Feeling Unwell', icon: '🤒', color: 'bg-yellow-600', description: 'Nausea, dizziness, or general discomfort' },
    { id: 'help-needed', name: 'Need Assistance', icon: '🆘', color: 'bg-blue-600', description: 'Need help with daily activities' },
    { id: 'safety', name: 'Safety Concern', icon: '⚠️', color: 'bg-purple-600', description: 'Suspicious activity or safety issue' },
  ];

  const startEmergencyCall = (contact: EmergencyContact) => {
    setEmergencyActive(true);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Simulate call being placed
          alert(`Calling ${contact.name} at ${contact.phoneNumber}...`);
          setEmergencyActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergency = () => {
    setEmergencyActive(false);
    setCountdown(0);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  if (emergencyActive) {
    return (
      <div className="min-h-screen bg-red-900 text-white flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <ExclamationTriangleIcon className="h-24 w-24 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl-senior font-bold mb-4">Emergency Call</h1>
          <p className="text-2xl-senior mb-8">
            Calling help in {countdown} seconds...
          </p>
          
          <div className="space-y-4">
            <motion.button
              onClick={cancelEmergency}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-8 bg-white text-red-900 rounded-xl text-xl-senior font-bold hover:bg-gray-100 transition-colors"
            >
              Cancel Emergency Call
            </motion.button>
            
            <motion.button
              onClick={() => startEmergencyCall(emergencyContacts[0])}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-8 bg-red-600 text-white rounded-xl text-xl-senior font-bold hover:bg-red-700 transition-colors"
            >
              Call Now (Don't Wait)
            </motion.button>
          </div>

          <p className="text-lg-senior mt-6 text-red-200">
            Emergency services will be contacted automatically
          </p>
        </motion.div>
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
              <ShieldCheckIcon className="h-10 w-10 mr-3 text-red-600" />
              Emergency Help
            </h1>
            <p className="text-lg-senior text-gray-600">
              Get help quickly when you need it
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xl-senior font-bold text-red-600">24/7</div>
          <div className="text-base-senior text-gray-600">Always Available</div>
        </div>
      </div>

      {/* Quick Emergency Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <motion.button
          onClick={() => startEmergencyCall(emergencyContacts[0])}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-8 bg-red-600 text-white rounded-xl text-center hover:bg-red-700 transition-colors"
        >
          <ExclamationTriangleIcon className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-2xl-senior font-bold mb-2">EMERGENCY</h2>
          <p className="text-lg-senior">Call 911 immediately</p>
        </motion.button>

        <motion.button
          onClick={() => startEmergencyCall(emergencyContacts[1])}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-8 bg-orange-600 text-white rounded-xl text-center hover:bg-orange-700 transition-colors"
        >
          <BellAlertIcon className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-2xl-senior font-bold mb-2">CALL NURSE</h2>
          <p className="text-lg-senior">Get help from staff</p>
        </motion.button>
      </motion.div>

      {/* Emergency Type Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
          What type of help do you need?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyTypes.map((type, index) => (
            <motion.button
              key={type.id}
              onClick={() => startEmergencyCall(emergencyContacts[0])}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 ${type.color} text-white rounded-xl text-center hover:opacity-90 transition-all`}
            >
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="text-lg-senior font-semibold mb-2">{type.name}</h3>
              <p className="text-sm-senior opacity-90">{type.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
          Emergency Contacts
        </h2>

        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`flex items-center justify-between p-6 rounded-xl border-2 ${getPriorityColor(contact.priority)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white rounded-xl">
                  {contact.priority === 'high' && <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />}
                  {contact.priority === 'medium' && <UserGroupIcon className="h-8 w-8 text-yellow-600" />}
                  {contact.priority === 'low' && <PhoneIcon className="h-8 w-8 text-green-600" />}
                </div>
                
                <div>
                  <h3 className="text-lg-senior font-semibold text-gray-900">
                    {contact.name}
                  </h3>
                  <p className="text-base-senior text-gray-600">{contact.role}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm-senior text-gray-600">
                    <div className="flex items-center space-x-1">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{contact.phoneNumber}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{contact.responseTime}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${contact.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${contact.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span>{contact.isAvailable ? 'Available' : 'Unavailable'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => startEmergencyCall(contact)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!contact.isAvailable}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Call Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Health Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6 flex items-center">
          <HeartIcon className="h-6 w-6 mr-2 text-red-600" />
          Your Health Information
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg-senior font-medium text-gray-900 mb-2">Medical Conditions</h3>
            <p className="text-base-senior text-gray-600 bg-gray-50 p-4 rounded-lg">
              {healthInfo.condition}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg-senior font-medium text-gray-900 mb-2">Current Medications</h3>
            <p className="text-base-senior text-gray-600 bg-gray-50 p-4 rounded-lg">
              {healthInfo.medication}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg-senior font-medium text-gray-900 mb-2">Allergies</h3>
            <div className="flex flex-wrap gap-2">
              {healthInfo.allergies.map((allergy, index) => (
                <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-base-senior">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg-senior font-medium text-gray-900 mb-2">Emergency Notes</h3>
            <p className="text-base-senior text-gray-600 bg-gray-50 p-4 rounded-lg">
              {healthInfo.emergencyNotes}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Location & Safety */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-4 flex items-center">
          <MapPinIcon className="h-6 w-6 mr-2 text-blue-600" />
          Your Location
        </h2>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg-senior font-medium text-blue-900 mb-2">Sunset Manor Group Home</h3>
          <p className="text-base-senior text-blue-800 mb-2">123 Peaceful Lane, Hometown, ST 12345</p>
          <p className="text-base-senior text-blue-700">Room 15B • Main Floor • East Wing</p>
        </div>
      </motion.div>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/" className="btn-secondary text-center block">
          <HomeIcon className="h-6 w-6 mx-auto mb-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default EmergencyPage;