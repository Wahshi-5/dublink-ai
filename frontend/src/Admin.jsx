import React, { useState } from "react";

export default function Admin() {
 const [users, setUsers] = useState([
  {
    name: "User One",
    plan: "Pro Plan",
    transactionId: "LM45829",
    status: "Pending",
  },
  {
    name: "User Two",
    plan: "Basic Plan",
    transactionId: "LM99821",
    status: "Pending",
  },
]);

const updateStatus = (index, newStatus) => {
  const updatedUsers = [...users];
  updatedUsers[index].status = newStatus;
  setUsers(updatedUsers);
};

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>👑 DubLink AI Admin Panel</h1>
      <p>Manage payments and user approvals</p>

      {users.map((user, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>{user.name}</h3>
          <p><strong>Plan:</strong> {user.plan}</p>
          <p><strong>Transaction ID:</strong> {user.transactionId}</p>
          <p><strong>Status:</strong> {user.status}</p>

          <button
  style={{ marginRight: "10px" }}
  onClick={() => updateStatus(index, "Approved")}
>
  APPROVE ✅
</button>

<button
  onClick={() => updateStatus(index, "Rejected")}
>
  REJECT ❌
</button>
        </div>
      ))}
    </div>
  );
}