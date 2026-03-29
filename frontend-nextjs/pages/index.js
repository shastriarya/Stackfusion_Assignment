import { useEffect, useState } from "react";
import SlotGrid from "../components/SlotGrid";
import { fetchAvailableSlots, fetchLots, fetchVehicles } from "../lib/api";

export default function HomePage() {
  const [lots, setLots] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedLot, setSelectedLot] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([fetchLots(), fetchVehicles()])
      .then(([lotsData, vehiclesData]) => {
        setLots(lotsData);
        setVehicles(vehiclesData);
      })
      .catch((err) => setError(err.message));
  }, []);

  async function loadSlots() {
    if (!selectedLot) {
      setError("Please select a parking lot first.");
      return;
    }
    setLoading(true);
    try {
      setError("");
      const parsed = await fetchAvailableSlots(selectedLot);
      setSlots(parsed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{ maxWidth: 800, margin: "20px auto", fontFamily: "sans-serif" }}
    >
      <h1>Parking Management Dashboard</h1>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="lot">Parking Lot: </label>
        <select
          id="lot"
          value={selectedLot}
          onChange={(e) => setSelectedLot(e.target.value)}
        >
          <option value="">Select lot</option>
          {lots.map((lot) => (
            <option key={lot.id} value={lot.id}>
              {lot.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="vehicle">Vehicle: </label>
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
        >
          <option value="">Select vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.number_plate}
            </option>
          ))}
        </select>
      </div>

      <button onClick={loadSlots} disabled={loading}>
        {loading ? "Loading..." : "Load Available Slots"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <h3 style={{ marginTop: 24 }}>Available Slots</h3>
      {loading ? (
        <p>Loading slots...</p>
      ) : (
        <SlotGrid
          slots={slots}
          selectedVehicle={selectedVehicle}
          fetchSlots={loadSlots}
        />
      )}
    </main>
  );
}
