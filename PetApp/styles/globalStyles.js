import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /* --------------------- CONTAINERS --------------------- */
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff', // fundo suave com leve azul
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4ff',
  },

  /* --------------------- TEXTOS --------------------- */
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 12,
    color: '#1e3a8a', // azul forte
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1e3a8a',
  },

  text: {
    fontSize: 14,
    color: '#333',
  },

  linkText: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
    color: '#1e88e5',
    fontWeight: '600',
  },

  /* --------------------- CARDS --------------------- */
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },

  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a8a',
  },

  petMeta: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },

  /* --------------------- DETALHES --------------------- */
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },

  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1e3a8a',
  },

  detailsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },

  /* --------------------- INPUTS --------------------- */
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c3d1ff',
    fontSize: 16,
    marginBottom: 12,
  },

  /* --------------------- BOTÕES --------------------- */
  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 2,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonSecondary: {
    backgroundColor: '#e2e8ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonSecondaryText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '700',
  },

  /* --------------------- FORM --------------------- */
  formContainer: {
    width: '100%',
    marginTop: 10,
  },

  /* --------------------- ERROS --------------------- */
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
  },

  /* --------------------- LISTA VAZIA --------------------- */
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    color: '#666',
  },

  /* ==================================================
      ESTILOS DO PROFILE SCREEN
     ================================================== */

  profileCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: '#1e3a8a', // marcador bonito
  },

  profileLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e3a8a',
    marginTop: 6,
  },

  profileValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },

  profileSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: '#1e3a8a',
    textAlign: 'center',
  },

  profileMetric: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#eef2ff',
    borderRadius: 8,
  },

  profileActions: {
    marginTop: 20,
    gap: 10,
  },

  logoutButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  deleteButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
