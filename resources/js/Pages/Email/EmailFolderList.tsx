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
  messages: Message[];
};

type AccountFolders = {
  [email: string]: { [folderName: string]: Folder };
};

interface EmailFolderListProps {
  folders: AccountFolders;
}

const EmailFolderList: React.FC<EmailFolderListProps> = ({ folders }) => {

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
              <li key={folderName} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Mail className="w-4 h-4" />
                  <span className="ml-2">{folderName}</span>
                </div>
                <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                  {folders[email][folderName].messages.length}
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
