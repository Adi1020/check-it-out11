import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const SESSION_KEY = 'session';

const setSession = async (user) => {
  const expiryTime = new Date().getTime() + SESSION_DURATION;
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ user, token: user.token, expiryTime }));
};

const getSession = async () => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION_KEY));
  if (!session) return null;

  const currentTime = new Date().getTime();
  if (currentTime > session.expiryTime) {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }

  return session;
};

const clearSession = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};

export { setSession, getSession, clearSession };
