const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('========= MONGODB ERROR =========');
    console.error('Name:', error.name);
    console.error('Message:', error.message);

    if (error.reason?.servers) {
      console.error('--------- SERVER DETAILS ---------');

      for (const [host, server] of error.reason.servers) {
        console.error(
          host,
          '=>',
          server.error?.message || server.type || 'No detailed error'
        );
      }
    }

    console.error('=================================');

    // Do not immediately kill the server.
    // This allows us to see the actual connection behavior.
  }
};

module.exports = connectDB;