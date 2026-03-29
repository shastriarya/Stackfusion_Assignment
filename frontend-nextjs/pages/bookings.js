import { useEffect, useState } from "react";
import {
  fetchActiveBookingsReport,
  fetchBookings,
  checkoutBooking,
} from "../lib/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [activeReport, setActiveReport] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [bookingRows, reportRows] = await Promise.all([
        fetchBookings(),
        fetchActiveBookingsReport(),
      ]);
      setBookings(bookingRows);
      setActiveReport(reportRows);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout(bookingId) {
    try {
      await checkoutBooking(bookingId);
      setSuccess("Checkout successful");
      setError("");
      loadData(); // Refresh data
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main
      style={{ maxWidth: 900, margin: "20px auto", fontFamily: "sans-serif" }}
    >
      <h1>Bookings</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <h3>All Bookings (Django)</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Vehicle
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Slot</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Lot</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Start Time
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              End Time
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {booking.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {booking.vehicle_number}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {booking.slot_number}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {booking.lot_name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {booking.start_time}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {booking.end_time || "Active"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {!booking.end_time && (
                  <button onClick={() => handleCheckout(booking.id)}>
                    Checkout
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Active Bookings Report (Go)</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Booking ID
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Number Plate
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Slot Number
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Lot Name
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Start Time
            </th>
          </tr>
        </thead>
        <tbody>
          {activeReport.map((row) => (
            <tr key={row.booking_id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {row.booking_id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {row.number_plate}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {row.slot_number}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {row.lot_name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {row.start_time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
