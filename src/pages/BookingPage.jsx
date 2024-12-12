import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const trainers = [
  {
    id: 1,
    name: 'محمد علي',
    nameEn: 'Mohamed Ali',
  },
  {
    id: 2,
    name: 'سارة أحمد',
    nameEn: 'Sarah Ahmed',
  },
];

const slots = [
  { id: 1, day: 'Monday', time: '5:00 PM - 6:00 PM' },
  { id: 2, day: 'Tuesday', time: '6:00 PM - 7:00 PM' },
  { id: 3, day: 'الاثنين', time: '5:00 PM - 6:00 PM' },
  { id: 4, day: 'الثلاثاء', time: '6:00 PM - 7:00 PM' },
];

const BookingPage = () => {
  const { user } = useAuth();
  const { trainerId } = useParams();
  const { t, i18n } = useTranslation();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  // Find the trainer by ID
  const trainer = trainers.find((t) => t.id === parseInt(trainerId));
  const trainerName = i18n.language === 'ar' ? trainer?.name : trainer?.nameEn;

  const handleBooking = () => {
    if (selectedSlot) setConfirmation(true);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-tr from-blue-500 to-green-500 text-white py-10 ${
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Title with Trainer's Name */}
        <h1 className="text-4xl font-bold text-center mb-8">
          {t('booking.title')} {trainerName}
        </h1>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">
            {t('booking.available_slots')}
          </h2>
          <ul className="space-y-4">
            {slots
              .filter((slot) =>
                i18n.language === 'ar'
                  ? slot.day.includes('ال')
                  : !slot.day.includes('ال')
              )
              .map((slot) => (
                <li
                  key={slot.id}
                  className={`cursor-pointer p-4 border rounded-lg ${
                    selectedSlot === slot.id
                      ? 'bg-green-100 border-green-500'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedSlot(slot.id)}
                >
                  {slot.day}: {slot.time}
                </li>
              ))}
          </ul>
          <button
            onClick={handleBooking}
            className={`mt-6 px-6 py-3 rounded-lg text-white font-bold ${
              selectedSlot
                ? 'bg-purple-500 hover:bg-purple-400'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedSlot}
          >
            {t('booking.confirm')}
          </button>
          {confirmation && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              {t('booking.success')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
