import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /* --------------------- CONTAINERS --------------------- */
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  /* --------------------- TEXTOS/TÍTULOS --------------------- */
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
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
    borderRadius: 10,
    elevation: 3,
  },

  petName: {
    fontSize: 18,
    fontWeight: '700',
  },

  petMeta: {
    fontSize: 14,
    color: '#666',
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
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 12,
  },

  /* --------------------- BOTÕES --------------------- */
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonSecondary: {
    backgroundColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonSecondaryText: {
    color: '#333',
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
});

export default styles;
