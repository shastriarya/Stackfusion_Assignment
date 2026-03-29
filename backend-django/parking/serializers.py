from rest_framework import serializers

from .models import Booking, ParkingLot, Slot, Vehicle


class ParkingLotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingLot
        fields = "__all__"


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = "__all__"


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = "__all__"
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def validate_slot(self, value):
        if not Slot.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Slot does not exist.")
        return value

    def validate_vehicle(self, value):
        if not Vehicle.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Vehicle does not exist.")
        return value

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "vehicle_number": instance.vehicle.number_plate,
            "slot_number": instance.slot.number,
            "lot_name": instance.slot.lot.name,
            "start_time": instance.start_time,
            "end_time": instance.end_time,
        }