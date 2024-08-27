// // // //mainfolder/app/timesheet/TimesheetForm.js

'use client';

import React, { useState } from 'react';

const TimesheetForm = ({ onSubmit, username }) => {
  const [formData, setFormData] = useState({
    date: '',
    start: '',
    end: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append('date', formData.date);
      formDataObj.append('start', formData.start);
      formDataObj.append('end', formData.end);
      formDataObj.append('username', username);

      await onSubmit(formDataObj);
      setFormData({ date: '', start: '', end: '' }); // Reset form after successful submission
      setSuccessMessage('Thanks, submitted successfully...'); // Set success message

      setTimeout(() => {
        setSuccessMessage(null); // Clear success message after 3 seconds
      }, 3000);
    } catch (err) {
      setError(
        'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 max-w-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg'
    >
      <div className='flex flex-col'>
        <label className='text-sm font-medium text-emerald-900' htmlFor='date'>
          Date
        </label>
        <input
          type='date'
          name='date'
          id='date'
          value={formData.date}
          onChange={handleChange}
          className='border border-emerald-300 text-emerald-900 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-900'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row sm:space-x-4'>
        <div className='flex flex-col flex-1'>
          <label
            className='text-sm font-medium text-emerald-900'
            htmlFor='start'
          >
            Start Time
          </label>
          <input
            type='time'
            name='start'
            id='start'
            value={formData.start}
            onChange={handleChange}
            className='border border-emerald-300 text-emerald-900 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-900'
            required
          />
        </div>

        <div className='flex flex-col flex-1 mt-4 sm:mt-0'>
          <label className='text-sm font-medium text-emerald-900' htmlFor='end'>
            End Time
          </label>
          <input
            type='time'
            name='end'
            id='end'
            value={formData.end}
            onChange={handleChange}
            className='border border-emerald-300 text-emerald-900 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-900'
            required
          />
        </div>
      </div>

      {error && <div className='text-red-500 text-sm'>{error}</div>}
      {successMessage && (
        <div className='text-green-500 text-sm'>{successMessage}</div>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className={`w-full py-3 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-slate-700 hover:bg-slate-900'
        } text-white rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default TimesheetForm;
