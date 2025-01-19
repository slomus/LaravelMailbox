import React, { useState } from 'react';
import { Mail } from 'lucide-react';

type Message = {
  uid: number;
  subject: string;
  from: string;
  body: string;
  seen: boolean;
};

type Folder = {
  name: string;
  path: string;
  unreadCount: number;
  messages: Message[];
};

type AccountFolders = {
  [accountId: string]: { 
    [email: string]: { 
      [folderName: string]: Folder 
    } 
  };
};

interface EmailFolderListProps {
  folders: AccountFolders;
  onFolderClick: (accountId: string, folderName: string, messages: Message[]) => void; // Zmiana, aby przekazywać accountId
}

const EmailFolderList: React.FC<EmailFolderListProps> = ({ folders, onFolderClick }) => {
  return (
    <div>
      {Object.keys(folders).map((accountId) => (
        <div key={accountId}>
          {Object.keys(folders[accountId]).map((email) => (
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
                {Object.keys(folders[accountId][email]).map((folderName) => (
                  <li
                    key={folderName}
                    className="flex items-center justify-between py-2 cursor-pointer"
                    onClick={() => {
                      const folder = folders[accountId][email][folderName];                      
                      onFolderClick(accountId, folderName, folder.messages); // Przekazujemy accountId i messages
                    }}
                  >
                    <div className="flex items-center">
                      <Mail className="w-4 h-4" />
                      <span className="ml-2">{folderName}</span>
                    </div>
                    <span id={`folders-${accountId}-${folderName}_count`} className="text-base bg-blue-600 font-bold rounded-full px-2 py-1 min-w-8 min-h-8 justify-center items-center flex">
                      {folders[accountId][email][folderName].unreadCount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EmailFolderList;
