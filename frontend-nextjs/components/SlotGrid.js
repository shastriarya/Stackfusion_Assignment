import { useState } from "react";
import { createBooking } from "../lib/api";

export default function SlotGrid({ slots, selectedVehicle, fetchSlots }) {
  const [bookingSlot, setBookingSlot] = useState(null);

  async function handleBook(slotId) {
    if (!selectedVehicle) {
      alert("Select a vehicle first");
      return;
    }

    setBookingSlot(slotId);
    try {
      await createBooking({
        vehicle: Number(selectedVehicle),
        slot: slotId,
      });
      alert("Booking created successfully");
      fetchSlots(); // Refresh slots after booking
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setBookingSlot(null);
    }
  }

  if (!slots.length) {
    return <p>No available slots found.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "8px",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      {slots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => handleBook(slot.id)}
          disabled={bookingSlot === slot.id}
        >
          {bookingSlot === slot.id ? "Booking..." : `Slot ${slot.number}`}
        </button>
      ))}
    </div>
  );
}
