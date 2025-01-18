import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonNodeProps {
  data: any;
  level?: number;
}

const JsonNode: React.FC<JsonNodeProps> = ({ data, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const indent = level * 15;

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <div
          style={{ marginLeft: indent }}
          className="text-gray-500 dark:text-gray-400"
        >
          Empty Array
        </div>
      );
    }
    return (
      <div style={{ marginLeft: indent }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span>Array ({data.length})</span>
        </button>
        {isExpanded && (
          <div className="ml-4">
            {data.map((item, index) => (
              <div key={index} className="mt-1">
                <JsonNode data={item} level={level + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  if (typeof data === "object" && data !== null) {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return (
        <div
          style={{ marginLeft: indent }}
          className="text-gray-500 dark:text-gray-400"
        >
          Empty Object
        </div>
      );
    }
    return (
      <div style={{ marginLeft: indent }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span>Object</span>
        </button>
        {isExpanded && (
          <div className="ml-4">
            {entries.map(([key, value]) => (
              <div key={key} className="mt-1">
                <span className="text-blue-600 dark:text-blue-400 capitalize">
                  {key}:{" "}
                </span>
                <JsonNode data={value} level={level + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <span
      className="text-gray-900 dark:text-gray-200"
      style={{ marginLeft: indent }}
    >
      {String(data)}
    </span>
  );
  
};

export default JsonNode;
