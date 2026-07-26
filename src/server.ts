/* eslint-disable no-console */

import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import mongoose from 'mongoose';
import { Server } from 'http';

import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {

    await mongoose.connect(config.database_url as string);

    console.log('✅ MongoDB Connected Successfully');

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('❌ MongoDB Connection Failed');
    console.error(error);
    process.exit(1);
  }
}

main();

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');

  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
});