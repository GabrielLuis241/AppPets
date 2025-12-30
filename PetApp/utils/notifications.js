import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function scheduleVaccineNotification(vaccine, pet) {
  if (!vaccine.proximaDose) return; // só agenda se tiver próxima dose

  const nextDoseDate = new Date(vaccine.proximaDose);
  const now = new Date();

  // não agenda se já passou
  if (nextDoseDate < now) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Vacina de ${pet.name}`,
      body: `A vacina "${vaccine.nome}" está próxima!`,
      sound: true,
    },
    trigger: nextDoseDate
  });
}

// Opcional: função para cancelar todas notificações de uma vacina
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
