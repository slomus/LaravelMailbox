import React from 'react';
import { Mail } from 'lucide-react';

type Message = {
  uid: number;
  subject: string;
  from: string;
  body: string;
};

type Folder = {
  name: string;
  path: string;
  unreadCount: number;
  messages: Message[];
};

type AccountFolders = {
  [email: string]: { [folderName: string]: Folder };
};

interface EmailFolderListProps {
  folders: AccountFolders;
  onFolderClick: (messages: Message[]) => void;
}

const EmailFolderList: React.FC<EmailFolderListProps> = ({ folders, onFolderClick }) => {
  return (
    <div>
      {Object.keys(folders).map((email) => (
        <div key={email}>
          <button
            className="w-full text-left bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
            onClick={() => {
              const folderElement = document.getElementById(`folders-${email}`);
              if (folderElement) {
                folderElement.classList.toggle('hidden');
              }
            }}
          >
            {email}
          </button>
          <ul id={`folders-${email}`} className="hidden mt-2">
            {Object.keys(folders[email]).map((folderName) => (
              <li
                key={folderName}
                className="flex items-center justify-between py-2 cursor-pointer"
                onClick={() => {
                  console.log('Folder messages:', folders[email][folderName].messages);
                  onFolderClick(folders[email][folderName].messages);
                }}
              >
                <div className="flex items-center">
                  <Mail className="w-4 h-4" />
                  <span className="ml-2">{folderName}</span>
                </div>
                <span className="text-base bg-blue-600 font-bold rounded-full px-2 py-1 min-w-8 min-h-8 justify-center items-center flex">
                  {folders[email][folderName].unreadCount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EmailFolderList;
