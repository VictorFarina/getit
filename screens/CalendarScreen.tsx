import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

interface LaundryRoom {
  id: number;
  name: string;
  street: string;
}

const CalendarScreen: React.FC = () => {
  const days: string[] = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];
  const timeSlots: string[] = [
    '07:00-12:00', '12:00-17:00', '17:00-22:00'
  ];
  const [bookings, setBookings] = useState<{[key: string]: boolean}>({});

  const users: number[] = [1001, 1002, 1003, 1004, 1005];

  const laundryRooms: LaundryRoom[] = [
    { id: 1, name: 'Tvättstuga A', street: 'Storgatan 1' },
    { id: 2, name: 'Tvättstuga B', street: 'Lillgatan 2' },
  ];

  const handleBooking = (day: number, timeSlot: number, laundryRoom: LaundryRoom) => {
    const bookingKey = `${day}-${timeSlot}-${laundryRoom.id}`;
    const isBooked = bookings[bookingKey];
    const userId = 1;

    setBookings(prevBookings => ({
      ...prevBookings,
      [bookingKey]: !prevBookings[bookingKey]
    }));

    const currentTime = new Date().toLocaleTimeString();
    if (!isBooked) {
      console.log(`Bokning gjord: Dag ${days[day]}, Tid ${timeSlots[timeSlot]}, Användare ID: ${userId}, Klicktid: ${currentTime}, Tvättstuga: ${laundryRoom.name}, Gata: ${laundryRoom.street}`);
    } else {
      console.log(`Bokning avbokad: Dag ${days[day]}, Tid ${timeSlots[timeSlot]}, Användare ID: ${userId}, Klicktid: ${currentTime}, Tvättstuga: ${laundryRoom.name}, Gata: ${laundryRoom.street}`);
    }
  };

  return (
    <View style={styles.container}>
      {laundryRooms.map((laundryRoom) => (
        <View key={laundryRoom.id} style={styles.laundryRoomContainer}>
          <Text style={styles.laundryRoomTitle}>{laundryRoom.name} - {laundryRoom.street}</Text>
          <View style={styles.headerRow}>
            <View style={styles.timeColumn}>
              <Text style={styles.headerText}>Tid</Text>
            </View>
            {days.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <Text style={styles.headerText}>{day}</Text>
              </View>
            ))}
          </View>
          <ScrollView horizontal={true}>
            <ScrollView>
              {timeSlots.map((time, timeIndex) => (
                <View key={timeIndex} style={styles.timeRow}>
                  <View style={styles.timeColumn}>
                    <Text style={[styles.timeText, styles.alignTop]}>{time}</Text>
                  </View>
                  {days.map((_, dayIndex) => {
                    const bookingKey = `${dayIndex}-${timeIndex}-${laundryRoom.id}`;
                    const isBooked = bookings[bookingKey];
                    return (
                      <TouchableOpacity
                        key={dayIndex}
                        style={[
                          styles.slot,
                          isBooked && styles.bookedSlot,
                          styles.slotBorder
                        ]}
                        onPress={() => handleBooking(dayIndex, timeIndex, laundryRoom)}
                      >
                        <View style={styles.slotContent}>
                          <Text style={[styles.slotText, isBooked && styles.bookedText]}>
                            {isBooked ? 'Bokat' : 'Ledig'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

const { width } = Dimensions.get('window');
const columnWidth = width / 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  laundryRoomContainer: {
    marginBottom: 20,
  },
  laundryRoomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontWeight: 'bold',
    padding: 10,
    color: '#333',
  },
  timeColumn: {
    width: columnWidth,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingLeft: 5,
    backgroundColor: '#f8f8f8',
  },
  dayColumn: {
    width: columnWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  alignTop: {
    marginTop: 5,
  },
  slot: {
    width: columnWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  slotBorder: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  slotContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookedSlot: {
    backgroundColor: '#e6f7ff',
  },
  slotText: {
    color: '#333',
    fontWeight: '500',
  },
  bookedText: {
    color: '#0066cc',
  },
});

export default CalendarScreen;
