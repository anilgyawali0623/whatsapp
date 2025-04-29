import React, { useState } from 'react';

const dummyUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-base-200 p-4 border-r border-base-300 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul className="space-y-2">
          {dummyUsers.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => setSelectedUser(user)}
                className={`btn w-full text-left ${
                  selectedUser?.id === user.id ? 'btn-accent' : 'btn-ghost'
                }`}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Chat Section */}
      <div className="flex-1 bg-base-100 p-6">
        {selectedUser ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Chat with {selectedUser.name}
            </h2>
            <div className="bg-base-200 rounded-xl p-4 h-[75vh] overflow-y-auto">
              {/* Messages will go here */}
              <p className="text-sm opacity-60">Chat messages will appear here.</p>
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Type your message"
              />
              <button className="btn btn-accent">Send</button>
            </div>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <p className="text-lg text-gray-500">👈 Click a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
