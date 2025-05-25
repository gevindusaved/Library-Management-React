import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import api from "../../api/axiosConfig";
import "./css/Members.css";

const Members = () => {
  const { username } = useParams();
  const navigate = useNavigate(); // ✅ initialize it
  const [fixedDepositId, setFixedDepositId] = useState("");
  const [fixedDeposits, setFixedDeposits] = useState([]);
  const [error, setError] = useState(null);

  const fetchFixedDeposits = async () => {
    if (!fixedDepositId.trim()) {
      setError("Please enter a Fixed Deposit ID");
      return;
    }

    try {
      const response = await api.post("/api/v1/fdeposits/lookup", {
        fixedDepositId,
        username,
      });

      setFixedDeposits([response.data]);
      setError(null);
      navigate(`/users/${username}`);
    } catch (err) {
      setError("No fixed deposit found or access denied.");
      setFixedDeposits([]);
      console.error(err);
    }
  };

  return (
    <div className="hero-header">
      <h2 className="check-fixed-deposit-h2">Check Fixed Deposits</h2>
      <form
      className="content-acc-form"
      onSubmit={(e) => {
        e.preventDefault(); // prevent form reload
        fetchFixedDeposits();
      }}
    >
      <div className="form-fixed-deposit-container">
        <div className="fixed-deposit-container">
          <label htmlFor="fixedDepositId">Enter Account ID:</label>
          <input
            type="text"
            id="fixedDepositId"
            value={fixedDepositId}
            onChange={(e) => setFixedDepositId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="fixed-deposit-container-button">
          Search
        </button>
      </div>

      {/* Conditional Rendering Block */}
      {fixedDeposits.length > 0 ? (
        <>
          {fixedDeposits.map((fd) => (
            <div key={fd.fixedDepositId} className="message-response">
              <p>
                <strong>Fixed Deposit ID:</strong> {fd.fixedDepositId}
              </p>
              <p>
                <strong>Amount:</strong> {fd.deposit_amount}
              </p>
              <p>
                <strong>Interest Rate:</strong> {fd.interest_rate}%
              </p>
              <p>
                <strong>Maturity Date:</strong> {fd.maturity_date}
              </p>
              <p>
                <strong>Current Balance:</strong>{" "}
                {fd.current_balance.toFixed(2)}
              </p>
              <p>
                <strong>Full Amount on Maturity:</strong>{" "}
                {fd.full_amount.toFixed(2)}
              </p>
            </div>
          ))}
        </>
      ) : (
        error && <p className="message-response" style={{ color: "red" }}>{error}</p>
      )}
    </form>
    </div>
  );
};

export default Members;
