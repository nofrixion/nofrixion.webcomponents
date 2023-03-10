import React, { useState } from 'react';
import './App.css';
import { usePaymentRequests } from './api/hooks/usePaymentRequests';

function App() {

  const apiUrl = 'https://api-dev.nofrixion.com/api/v1';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbmlkIjoiY2U5MDUzOTctMWRhZS00ZjJhLWEwMTUtMTllYmQyZGZjNzZlIn0.9IJR5c1_pjlWk3XstuXmvW36BI-bcckcI8l2CGNccSM';

  const [page, setPage] = useState(1);

  const {
    paymentRequests, 
    pageNumber, 
    totalPages
  } = usePaymentRequests(apiUrl, token, page);

  return (
    <div className="App">

    <table id="paymentRequestsTable">
      <thead>
          <tr><th>Created At</th><th>ID</th><th>Amount</th><th>Status</th></tr>
          </thead>
            {paymentRequests.map((pay) => (
              <tr id={pay.id}>
              <td>{JSON.stringify(pay.inserted)}</td>
              <td>{pay.id}</td>
              <td>{pay.amount}</td>
              <td>{pay.status}</td>
              </tr>
            ))}
          
    </table>
    <button onClick={() => setPage(page - 1)}>Prev Page</button>
    <button onClick={() => setPage(page + 1)}>Next Page</button>
    <span>{pageNumber}</span>
    <br/>
    <span>{totalPages}</span>
    </div>
  );
}

export default App;
