import React from 'react';

type MessageProps = {
  message: {
    uid: number;
    subject: string;
    from: string;
    body: string;
  };
};

const EmailMessageView: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className='text-center'>
      <h2><span className='font-bold'>Temat:</span> {message.subject}</h2>
      <p><span className='font-bold'>Wiadomość od:</span> {message.from}</p>
      <div dangerouslySetInnerHTML={{ __html: message.body }}></div>
    </div>
  );
};

export default EmailMessageView;
