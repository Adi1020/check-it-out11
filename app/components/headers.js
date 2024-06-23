// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const Header = ({title, onLogout}) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
//       {onLogout && (
//         <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   logoutButton: {
//     backgroundColor: '#dc3545',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontSize: 14,
//   },
// });

// export default Header; working code
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/themeContext';

const Header = ({ title, onLogout }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.header }]}>
      <Text style={[styles.headerText, { color: theme.headerText }]}>{title}</Text>
      <View style={styles.rightButtons}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Text style={[styles.themeToggleText, { color: theme.headerText }]}>Toggle Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} style={styles.logout}>
          <Text style={[styles.logoutText, { color: theme.headerText }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggle: {
    marginRight: 10,
  },
  themeToggleText: {
    fontSize: 14,
  },
  logout: {
    marginLeft: 10,
  },
  logoutText: {
    fontSize: 14,
  },
});

export default Header;
