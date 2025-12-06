import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  PhotoIcon,
  PhoneIcon,
  HomeIcon,
  CalendarIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { useUserStore } from '../stores/userStore';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(currentUser || {});

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-xl-senior text-gray-600">No user profile found.</p>
      </div>
    );
  }

  const handleSave = () => {
    if (editData.name && editData.emergencyContact?.name && editData.emergencyContact?.phone) {
      setCurrentUser(editData as any);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleCancel = () => {
    setEditData(currentUser);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Photo */}
          <div className="relative">
            {currentUser.photo ? (
              <img
                src={currentUser.photo}
                alt={`${currentUser.name}'s photo`}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center border-4 border-primary-200">
                <UserIcon className="w-16 h-16 text-primary-600" />
              </div>
            )}
            <button
              className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
              onClick={() => toast('Photo upload coming soon!')}
              disabled
            >
              <PhotoIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl-senior font-bold text-gray-900 mb-2">
              {currentUser.name}
            </h1>
            {currentUser.room && (
              <div className="flex items-center justify-center md:justify-start space-x-2 text-lg-senior text-gray-600 mb-2">
                <HomeIcon className="w-5 h-5" />
                <span>{currentUser.room}</span>
              </div>
            )}
            <div className="flex items-center justify-center md:justify-start space-x-2 text-base-senior text-gray-500">
              <CalendarIcon className="w-5 h-5" />
              <span>
                Joined {new Date(currentUser.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary"
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Emergency Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
          Emergency Contact
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-base-senior font-medium text-gray-700 mb-2">
              Name
            </label>
            <p className="text-lg-senior text-gray-900">
              {currentUser.emergencyContact.name}
            </p>
          </div>
          <div>
            <label className="block text-base-senior font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="w-5 h-5 text-gray-500" />
              <p className="text-lg-senior text-gray-900">
                {currentUser.emergencyContact.phone}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-base-senior font-medium text-gray-700 mb-2">
              Relationship
            </label>
            <p className="text-lg-senior text-gray-900">
              {currentUser.emergencyContact.relationship}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
          Accessibility Preferences
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base-senior font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <p className="text-lg-senior text-gray-900 capitalize">
              {currentUser.preferences.fontSize.replace('-', ' ')}
            </p>
          </div>
          <div>
            <label className="block text-base-senior font-medium text-gray-700 mb-2">
              High Contrast
            </label>
            <p className="text-lg-senior text-gray-900">
              {currentUser.preferences.highContrast ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <div>
            <label className="block text-base-senior font-medium text-gray-700 mb-2">
              Voice Support
            </label>
            <p className="text-lg-senior text-gray-900">
              {currentUser.preferences.voiceEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <div>
            <label className="block text-base-senior font-medium text-gray-700 mb-2">
              Notifications
            </label>
            <p className="text-lg-senior text-gray-900">
              {currentUser.preferences.notifications ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Medical Information (if available) */}
      {currentUser.medicalInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-xl-senior font-semibold text-gray-900 mb-6">
            Medical Information
          </h2>
          
          {currentUser.medicalInfo.allergies && currentUser.medicalInfo.allergies.length > 0 && (
            <div className="mb-4">
              <label className="block text-base-senior font-medium text-gray-700 mb-2">
                Allergies
              </label>
              <p className="text-lg-senior text-gray-900">
                {currentUser.medicalInfo.allergies.join(', ')}
              </p>
            </div>
          )}
          
          {currentUser.medicalInfo.medications && currentUser.medicalInfo.medications.length > 0 && (
            <div className="mb-4">
              <label className="block text-base-senior font-medium text-gray-700 mb-2">
                Current Medications
              </label>
              <p className="text-lg-senior text-gray-900">
                {currentUser.medicalInfo.medications.join(', ')}
              </p>
            </div>
          )}
          
          {currentUser.medicalInfo.conditions && currentUser.medicalInfo.conditions.length > 0 && (
            <div>
              <label className="block text-base-senior font-medium text-gray-700 mb-2">
                Medical Conditions
              </label>
              <p className="text-lg-senior text-gray-900">
                {currentUser.medicalInfo.conditions.join(', ')}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Edit Modal */}
      {isEditing && (
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
                Edit Profile
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="input-senior"
                    value={editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Room Number
                  </label>
                  <input
                    type="text"
                    className="input-senior"
                    value={editData.room || ''}
                    onChange={(e) => setEditData({ ...editData, room: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      className="input-senior"
                      value={editData.emergencyContact?.name || ''}
                      onChange={(e) => setEditData({
                        ...editData,
                        emergencyContact: {
                          ...editData.emergencyContact!,
                          name: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      className="input-senior"
                      value={editData.emergencyContact?.phone || ''}
                      onChange={(e) => setEditData({
                        ...editData,
                        emergencyContact: {
                          ...editData.emergencyContact!,
                          phone: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg-senior font-medium text-gray-700 mb-2">
                    Relationship
                  </label>
                  <select
                    className="input-senior"
                    value={editData.emergencyContact?.relationship || ''}
                    onChange={(e) => setEditData({
                      ...editData,
                      emergencyContact: {
                        ...editData.emergencyContact!,
                        relationship: e.target.value
                      }
                    })}
                  >
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Other Family">Other Family</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;