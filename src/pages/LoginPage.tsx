import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, PhotoIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/userStore';
import { User } from '../types';

const LoginPage: React.FC = () => {
  const { login } = useUserStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });

  const handleQuickLogin = (demoUser: User) => {
    login(demoUser);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: User = {
      id: crypto.randomUUID(),
      name: formData.name,
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship,
      },
      preferences: {
        fontSize: 'large',
        highContrast: false,
        voiceEnabled: false,
        notifications: true,
      },
      joinDate: new Date(),
    };
    
    login(newUser);
  };

  // Demo users for easy testing
  const demoUsers: User[] = [
    {
      id: '1',
      name: 'Margaret Johnson',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      emergencyContact: {
        name: 'Sarah Johnson',
        phone: '555-0123',
        relationship: 'Daughter',
      },
      preferences: {
        fontSize: 'large',
        highContrast: false,
        voiceEnabled: true,
        notifications: true,
      },
      room: 'Room 101',
      joinDate: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Robert Williams',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      emergencyContact: {
        name: 'Michael Williams',
        phone: '555-0456',
        relationship: 'Son',
      },
      preferences: {
        fontSize: 'extra-large',
        highContrast: true,
        voiceEnabled: false,
        notifications: true,
      },
      room: 'Room 205',
      joinDate: new Date('2024-03-10'),
    },
    {
      id: '3',
      name: 'Dorothy Chen',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      emergencyContact: {
        name: 'Linda Chen',
        phone: '555-0789',
        relationship: 'Daughter',
      },
      preferences: {
        fontSize: 'medium',
        highContrast: false,
        voiceEnabled: true,
        notifications: true,
      },
      room: 'Room 143',
      joinDate: new Date('2024-02-20'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary-700 mb-4">
            Welcome to Group Home
          </h1>
          <p className="text-xl-senior text-gray-600 max-w-2xl mx-auto">
            Your personal assistant for daily activities, reminders, and staying connected with family and friends.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!showForm ? (
            <div>
              <h2 className="text-2xl-senior font-semibold text-center mb-8">
                Choose your profile or create a new one
              </h2>
              
              {/* Demo user profiles */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {demoUsers.map((user) => (
                  <motion.button
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    className="card hover:shadow-xl transition-shadow duration-300 text-center p-6"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={user.photo}
                      alt={`${user.name}'s photo`}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-200"
                    />
                    <h3 className="text-lg-senior font-semibold text-gray-900 mb-2">
                      {user.name}
                    </h3>
                    <p className="text-base-senior text-gray-600">
                      {user.room}
                    </p>
                  </motion.button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-secondary text-lg-senior"
                >
                  <UserIcon className="h-6 w-6 mr-2" />
                  Create New Profile
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl-senior font-semibold text-center mb-8">
                Create Your Profile
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="input-senior"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      className="input-senior"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      placeholder="Contact person's name"
                    />
                  </div>
                  <div>
                    <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      required
                      className="input-senior"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Relationship to Emergency Contact
                  </label>
                  <select
                    required
                    className="input-senior"
                    value={formData.emergencyContactRelationship}
                    onChange={(e) => setFormData({ ...formData, emergencyContactRelationship: e.target.value })}
                  >
                    <option value="">Select relationship</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Other Family">Other Family</option>
                  </select>
                </div>

                <div className="flex gap-4 justify-center pt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Create Profile
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;