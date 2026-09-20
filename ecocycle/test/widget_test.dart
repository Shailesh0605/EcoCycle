import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:ecocycle/screens/login_screen.dart';

void main() {
  testWidgets('EcoCycle login screen loads', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: LoginScreen(),
      ),
    );

    expect(find.byType(LoginScreen), findsOneWidget);
  });
}