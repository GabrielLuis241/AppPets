import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getVets } from '../utils/storage';
import styles from '../styles/globalStyles';

export default function VetsScreen() {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    getVets().then(setVets);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Veterinários & Clínicas</Text>

      {vets.map(v => (
        <View key={v.id} style={styles.card}>
          <Text style={styles.petName}>{v.name}</Text>
          <Text>{v.type}</Text>
          <Text>{v.specialty}</Text>
          <Text>{v.location}</Text>
          <Text>{v.phone}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
