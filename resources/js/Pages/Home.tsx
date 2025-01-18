import React, { useState } from 'react';
import exampleJson from './exmaple.json';
import {
  Mail,
  Send,
  Star,
  Archive,
  Trash2,
  Settings,
  Menu,
  Search,
} from 'lucide-react';
import JsonNode from './JsonNode';

const Home: React.FC = () => {
  const [jsonData, setJsonData] = useState(exampleJson);

  const folders = [
    { name: 'Skrzynka odbiorcza', icon: <Mail className="w-4 h-4" />, count: '1' },
    { name: 'Wysłane', icon: <Send className="w-4 h-4" />, count: '0' },
    { name: 'Oznaczone gwiazdką', icon: <Star className="w-4 h-4" />, count: '0' },
    { name: 'Archiwum', icon: <Archive className="w-4 h-4" />, count: '0' },
    { name: 'Kosz', icon: <Trash2 className="w-4 h-4" />, count: '0' },
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
        <main className="flex-1 overflow-auto p-4">
          <JsonNode data={jsonData} />
        </main>
      </div>
    </div>
  );
};

export default Home;
