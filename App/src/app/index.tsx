import LoginForm from '@/features/auth/components/LoginForm';
import { StyleSheet, View } from 'react-native';

const Index = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
});