import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'firebase_options.dart';

import 'screens/login_screen.dart';
import 'screens/requests_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/pickup_screen.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Initialize Supabase
  await Supabase.initialize(
    url: 'https://okozlwiebkqjsylsakiq.supabase.co',
    anonKey: 'sb_publishable_fE8yXu2QceIja0L37kl37w_Ed0HIUQC',
  );

  runApp(const EcoCycleApp());
}

class EcoCycleApp extends StatelessWidget {
  const EcoCycleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'EcoCycle',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.green,
        ),
        useMaterial3: true,
      ),
      home: const LoginScreen(),
      routes: {
        '/requests': (context) => const RequestsScreen(),
        '/profile': (context) => const ProfileScreen(),
        '/pickup': (context) => const PickupScreen(),
      },
    );
  }
}