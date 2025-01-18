import React, { useState, useEffect } from 'react';
import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import EmailFolderList from '@/Pages/Email/EmailFolderList';
import { Mail, Send, Star, Archive, Trash2, Settings, Menu, Search } from 'lucide-react';
import JsonNode from './JsonNode';
import { PageProps } from '@/types';

export default function Home({ allFolders, status }: PageProps<{ allFolders?: any, status?: string}>) {
  const { props } = usePage();
  const user = props.auth.user;
  const [jsonData, setJsonData] = useState(allFolders);

  console.log('allFolders:', allFolders);
  console.log('jsonData:', jsonData);

  const folders = [
    { name: 'Skrzynka odbiorcza', icon: <Mail className="w-4 h-4" />, count: '1' },
    { name: 'Wysłane', icon: <Send className="w-4 h-4" />, count: '0' },
    { name: 'Oznaczone gwiazdką', icon: <Star className="w-4 h-4" />, count: '0' },
    { name: 'Archiwum', icon: <Archive className="w-4 h-4" />, count: '0' },
    { name: 'Kosz', icon: <Trash2 className="w-4 h-4" />, count: '0' },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink href={route('poczta.folders')} active={route().current('poczta.folders')}>
              Poczta
            </NavLink>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input type="text" placeholder="Szukaj..." className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-gray-200" />
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Dropdown>
              <Dropdown.Trigger>
                <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none">
                  <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Konto
                </Dropdown.Link>
                <Dropdown.Link href={route('profiles.email')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Konto e-mail
                </Dropdown.Link>
                <Dropdown.Link href={route('logout')} method="post" as="button" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Wyloguj się
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 dark:hover:bg-blue-500">
            Nowa wiadomość
          </button>
          <nav className="mt-6">
            <EmailFolderList folders={jsonData} />
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4">
          <JsonNode data={jsonData} />
        </main>
      </div>
    </div>
  );
}
