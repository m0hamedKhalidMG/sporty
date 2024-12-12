import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const bookings = [
  {
    id: 1,
    trainer: 'Mohamed Ali',
    trainerAr: 'محمد علي',
    sport: 'Tennis',
    sportAr: 'تنس',
    time: 'Monday, 5:00 PM',
    timeAr: 'الاثنين، 5:00 مساءً',
  },
  {
    id: 2,
    trainer: 'Sarah Ahmed',
    trainerAr: 'سارة أحمد',
    sport: 'Karate',
    sportAr: 'كاراتيه',
    time: 'Wednesday, 4:00 PM',
    timeAr: 'الأربعاء، 4:00 مساءً',
  },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {t('dashboard.title')}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-2xl font-bold mb-4">
            {t('auth.username')}: {user?.username || t('errors.login_required')}
          </h2>

          {/* Bookings List */}
          {bookings.length > 0 ? (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="p-4 border rounded-lg bg-gradient-to-r from-purple-200 to-blue-200 shadow-md"
                >
                  <h3 className="text-xl font-semibold">
                    {t('dashboard.trainer')}:{' '}
                    {i18n.language === 'ar'
                      ? booking.trainerAr
                      : booking.trainer}
                  </h3>
                  <p className="mt-1">
                    {t('trainers.sport')}:{' '}
                    {i18n.language === 'ar' ? booking.sportAr : booking.sport}
                  </p>
                  <p className="mt-1">
                    {t('dashboard.time')}:{' '}
                    {i18n.language === 'ar' ? booking.timeAr : booking.time}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">{t('dashboard.no_bookings')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
