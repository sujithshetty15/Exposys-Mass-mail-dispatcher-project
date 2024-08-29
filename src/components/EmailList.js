// src/components/EmailList.js
import React from 'react';

function EmailList({ emails }) {
  return (
    <div>
      <h2>Valid Emails</h2>
      <ul>
        {emails.valid.map((email, index) => (
          <li key={index} className="valid">{email}</li>
        ))}
      </ul>

      <h2>Invalid Emails</h2>
      <ul>
        {emails.invalid.map((email, index) => (
          <li key={index} className="invalid">{email}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;
