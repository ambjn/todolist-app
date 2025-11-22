import { Colors } from "@/constants/Colors";
import { useSSO } from "@clerk/clerk-expo";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { startSSOFlow } = useSSO()
  const { top } = useSafeAreaInsets()

  const handleOAuth = async (strategy: 'oauth_apple' | 'oauth_google') => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: strategy,
      })
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              // router.push('/sign-in/tasks')
              return
            }

            // router.push('/')
          },
        })
      } else {
        console.log('no session created')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const openLink = async () => {
    await WebBrowser.openBrowserAsync(
      'https://google.com',
    )
  }

  return (
    <View
      style={[styles.container, { paddingTop: top }]}
    >
      <Image
        source={require('@/assets/images/todoist-logo.png')}
        style={styles.loginImage}
      />
      <Image
        source={require('@/assets/images/login.png')}
        style={styles.bannerImage}
      />
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={() => handleOAuth('oauth_apple')}
          style={styles.button}
        >
          <Ionicons name="logo-apple" size={24} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOAuth('oauth_google')}
          style={styles.button}
        >
          <Ionicons name="logo-google" size={24} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        By continuing you agree to Todoist's{' '}
        <Text style={styles.link} onPress={openLink}>
          Terms of Service
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40, marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bannerImage: {
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,

  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})