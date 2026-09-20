import 'package:flutter/material.dart';

class LearnScreen extends StatelessWidget {
  const LearnScreen({super.key});

  final List<Map<String, dynamic>> topics = const [
    {
      'title': 'What is E-Waste?',
      'icon': Icons.devices,
      'content':
          'E-waste means electronic products that are no longer wanted, working, or useful. Examples include old mobile phones, laptops, computers, televisions, printers, batteries and other electronic devices.',
    },
    {
      'title': 'Types of E-Waste',
      'icon': Icons.category,
      'content':
          'Common e-waste includes mobile phones, laptops, computers, tablets, televisions, refrigerators, washing machines, printers, chargers, cables and batteries.',
    },
    {
      'title': 'Why is E-Waste Harmful?',
      'icon': Icons.warning_amber_rounded,
      'content':
          'Improper disposal of e-waste can release harmful substances into the environment. It can pollute soil and water and may create health and environmental risks.',
    },
    {
      'title': 'How to Dispose of E-Waste',
      'icon': Icons.recycling,
      'content':
          'Do not throw electronic devices in normal household garbage. Separate your e-waste and hand it over to an authorized collection or recycling facility.',
    },
    {
      'title': 'Do’s and Don’ts',
      'icon': Icons.check_circle_outline,
      'content':
          'DO separate e-waste from regular waste, remove personal data, and use proper collection services. DON’T burn electronics, break batteries, or throw electronic devices into regular garbage.',
    },
    {
      'title': 'E-Waste Recycling Process',
      'icon': Icons.loop,
      'content':
          'The recycling process generally involves collection, sorting, dismantling, recovery of useful materials, safe treatment of hazardous components, and recycling or disposal of remaining materials.',
    },
    {
      'title': 'Protect Your Personal Data',
      'icon': Icons.security,
      'content':
          'Before giving away a phone, laptop, computer, or storage device, back up important information and securely remove your personal data. Factory-reset devices when appropriate.',
    },
    {
      'title': 'Benefits of Recycling',
      'icon': Icons.eco,
      'content':
          'Recycling e-waste helps recover useful materials, reduces the amount of waste sent to landfills, saves resources, and supports responsible management of electronic products.',
    },
  ];

  void openTopic(
    BuildContext context,
    String title,
    String content,
    IconData icon,
  ) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => LearnDetailScreen(
          title: title,
          content: content,
          icon: icon,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Learn',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.green.shade50,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(
                  Icons.eco,
                  size: 45,
                  color: Colors.green,
                ),
                SizedBox(height: 12),
                Text(
                  'Learn About E-Waste',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  'Learn how to handle, dispose and recycle electronic waste responsibly.',
                  style: TextStyle(
                    fontSize: 15,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          ...topics.map(
            (topic) => Card(
              margin: const EdgeInsets.only(bottom: 12),
              elevation: 2,
              child: ListTile(
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                leading: CircleAvatar(
                  backgroundColor: Colors.green.shade50,
                  child: Icon(
                    topic['icon'] as IconData,
                    color: Colors.green,
                  ),
                ),
                title: Text(
                  topic['title'] as String,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                subtitle: const Padding(
                  padding: EdgeInsets.only(top: 4),
                  child: Text(
                    'Tap to learn more',
                  ),
                ),
                trailing: const Icon(
                  Icons.arrow_forward_ios,
                  size: 16,
                ),
                onTap: () {
                  openTopic(
                    context,
                    topic['title'] as String,
                    topic['content'] as String,
                    topic['icon'] as IconData,
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class LearnDetailScreen extends StatelessWidget {
  final String title;
  final String content;
  final IconData icon;

  const LearnDetailScreen({
    super.key,
    required this.title,
    required this.content,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(
                radius: 42,
                backgroundColor: Colors.green.shade50,
                child: Icon(
                  icon,
                  size: 45,
                  color: Colors.green,
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              title,
              style: const TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              content,
              style: const TextStyle(
                fontSize: 17,
                height: 1.6,
              ),
            ),
          ],
        ),
      ),
    );
  }
}