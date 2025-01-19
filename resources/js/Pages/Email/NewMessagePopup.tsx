import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function NewMessagePopup({ onClose }) {
  const { data, setData, post, processing, errors } = useForm({
    to: '',
    subject: '',
    body: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('send_message'), {
      onSuccess: () => onClose()
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Nowa wiadomość</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Do kogo:</label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.to}
              onChange={(e) => setData('to', e.target.value)}
            />
            {errors.to && <div className="text-red-600">{errors.to}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Temat:</label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.subject}
              onChange={(e) => setData('subject', e.target.value)}
            />
            {errors.subject && <div className="text-red-600">{errors.subject}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Treść wiadomości:</label>
            <textarea
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.body}
              onChange={(e) => setData('body', e.target.value)}
            />
            {errors.body && <div className="text-red-600">{errors.body}</div>}
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 bg-gray-600 text-white rounded" onClick={onClose}>
              Anuluj
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={processing}>
              Wyślij
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
