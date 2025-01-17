import React from 'react';
import { Search, Menu, Mail, Send, Trash2, Star, Archive, Settings } from 'lucide-react';

const Home = () => {
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
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-semibold text-gray-800">Poczta</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Szukaj..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700">
            Nowa wiadomość
          </button>
          <nav className="mt-6">
            {folders.map((folder) => (
              <a
                key={folder.name}
                href="#"
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <div className="flex items-center space-x-3">
                  {folder.icon}
                  <span>{folder.name}</span>
                </div>
                <span className="text-sm text-gray-500">{folder.count}</span>
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="divide-y divide-gray-200">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`flex items-center px-6 py-4 hover:bg-gray-50 cursor-pointer ${
                  email.unread ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${email.unread ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                      {email.sender}
                    </p>
                    <p className="text-sm text-gray-500">{email.time}</p>
                  </div>
                  <h3 className={`text-sm ${email.unread ? 'font-semibold' : 'font-medium'} text-gray-900 mt-1`}>
                    {email.subject}
                  </h3>
                  <p className="text-sm text-gray-500 truncate mt-1">{email.preview}</p>
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
