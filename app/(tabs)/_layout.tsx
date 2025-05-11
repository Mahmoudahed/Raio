import { Tabs } from 'expo-router';
import { Radio, Users, List, Settings } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        tabBarStyle: { 
          backgroundColor: Colors[colorScheme ?? 'dark'].tabBackground,
          borderTopColor: Colors[colorScheme ?? 'dark'].tabBorder,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'dark'].headerBackground,
        },
        headerTintColor: Colors[colorScheme ?? 'dark'].headerTint,
        tabBarLabelStyle: {
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Radio',
          tabBarIcon: ({ color, size }) => <Radio size={size} color={color} />,
          headerTitle: 'Police Radio',
        }}
      />
      <Tabs.Screen
        name="channels"
        options={{
          title: 'Channels',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}