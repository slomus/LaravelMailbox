import React from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavLink from '@/Components/NavLink';
import { Search, Menu, Mail, Send, Trash2, Star, Archive, Settings } from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

const Home = () => {
  const user = usePage().props.auth.user;
  const folders = [
    { name: 'Skrzynka odbiorcza', icon: <Mail className="w-4 h-4" />, count: 'x' },
    { name: 'Wysłane', icon: <Send className="w-4 h-4" />, count: 'x' },
    { name: 'Oznaczone gwiazdką', icon: <Star className="w-4 h-4" />, count: 'x' },
    { name: 'Archiwum', icon: <Archive className="w-4 h-4" />, count: 'x' },
    { name: 'Kosz', icon: <Trash2 className="w-4 h-4" />, count: 'x'  },
  ];

  const emails = [
      {
          id: 1,
          sender: 'test_wysylajacy',
          subject: 'temat',
          preview: 'test_preview',
          time: '00:00',
          unread: true
      }
  ];

  return (
    <div className="h-screen flex flex-col text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between text-gray-800 dark:text-gray-200">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
            >
                Poczta
            </NavLink>
            </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Szukaj..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-gray-200"
            />
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <div className="relative">
            <Dropdown>
              <Dropdown.Trigger>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none"
                >
                  <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </Dropdown.Trigger>

              <Dropdown.Content>
                <Dropdown.Link
                  href={route('profile.edit')}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Dropdown.Link>
                <Dropdown.Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>

          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 dark:hover:bg-blue-500">
            Nowa wiadomość
          </button>
          <nav className="mt-6">
            {folders.map((folder) => (
              <a
                key={folder.name}
                href="#"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
                <div className="flex items-center space-x-3">
                  {folder.icon}
                  <span>{folder.name}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{folder.count}</span>
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                  email.unread ? 'bg-blue-50 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm ${email.unread ? 'font-semibold' : 'font-medium'} text-gray-900 dark:text-gray-200`}
                    >
                      {email.sender}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{email.time}</p>
                  </div>
                  <h3
                    className={`text-sm ${email.unread ? 'font-semibold' : 'font-medium'} text-gray-900 dark:text-gray-200 mt-1`}
                  >
                    {email.subject}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{email.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
