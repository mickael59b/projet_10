import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/user/userSlice'; // Assuming you have a clearUser action

const UserPage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser()); // Clear user data on logout
    // You might want to redirect to the login page or homepage after logout
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{user?.name || 'User'}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {/* Accounts Section */}
      {[{ title: 'Argent Bank Checking', amount: '$2,082.79', description: 'Available Balance', id: 'x8349' },
        { title: 'Argent Bank Savings', amount: '$10,928.42', description: 'Available Balance', id: 'x6712' },
        { title: 'Argent Bank Credit Card', amount: '$184.30', description: 'Current Balance', id: 'x8349' }].map(account => (
        <section className="account" key={account.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title} ({account.id})</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
      <div>
        <button className="sign-out-button" onClick={handleLogout}>Sign Out</button>
      </div>
    </main>
  );
};

export default UserPage;
