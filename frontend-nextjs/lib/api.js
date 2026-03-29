const API_DJANGO_BASE =
  process.env.NEXT_PUBLIC_DJANGO_API || "http://localhost:8000/api";
const API_GO_BASE = process.env.NEXT_PUBLIC_GO_API || "http://localhost:8080";

async function handleResponse(res) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data.detail || data.message || `HTTP ${res.status}: ${res.statusText}`,
    );
  }
  return res.json();
}

export async function fetchLots() {
  const res = await fetch(`${API_DJANGO_BASE}/lots/`);
  return handleResponse(res);
}

export async function fetchVehicles() {
  const res = await fetch(`${API_DJANGO_BASE}/vehicles/`);
  return handleResponse(res);
}

export async function fetchAvailableSlots(lotId) {
  const res = await fetch(`${API_DJANGO_BASE}/lots/${lotId}/slots/available/`);
  return handleResponse(res);
}

export async function createBooking(payload) {
  const res = await fetch(`${API_DJANGO_BASE}/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function fetchBookings() {
  const res = await fetch(`${API_DJANGO_BASE}/bookings/`);
  return handleResponse(res);
}

export async function checkoutBooking(bookingId) {
  const res = await fetch(
    `${API_DJANGO_BASE}/bookings/${bookingId}/checkout/`,
    {
      method: "PATCH",
    },
  );
  return handleResponse(res);
}

export async function fetchActiveBookingsReport() {
  const res = await fetch(`${API_GO_BASE}/active-bookings`);
  return handleResponse(res);
}
