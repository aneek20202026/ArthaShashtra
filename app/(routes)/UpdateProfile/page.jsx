import React, { useEffect, useState } from "react";

const UpdatePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}login?uid=${uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data.message);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const updatedUserData = { ...userData, uid, industry: "" };
    try {
      const response = await fetch(`${api}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      });
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      alert("Data updated successfully");
    } catch (err) {
      alert("Error updating data");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>User Data</h2>
      {userData && (
        <div>
          <label>Annual Revenue:
            <input type="number" name="annual_revenue" value={userData.annual_revenue} onChange={handleChange} />
          </label>
          <br />
          <label>Monthly Budget:
            <input type="number" name="monthly_budget" value={userData.monthly_budget} onChange={handleChange} />
          </label>
          <br />
          <label>Recurring Expenses:
            <input type="number" name="recurring_expenses" value={userData.recurring_expenses} onChange={handleChange} />
          </label>
          <br />
          <label>Savings:
            <input type="number" name="savings" value={userData.savings} onChange={handleChange} />
          </label>
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default UpdatePage;
