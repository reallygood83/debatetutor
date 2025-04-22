import mongoose from 'mongoose';

let cached = global as any;

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다.');
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    cached.mongoose.promise = mongoose.connect(process.env.MONGODB_URI, opts);
  }
  
  try {
    cached.mongoose.conn = await cached.mongoose.promise;
    console.log('MongoDB에 성공적으로 연결되었습니다.');
  } catch (e) {
    cached.mongoose.promise = null;
    console.error('MongoDB 연결 오류:', e);
    throw e;
  }

  return cached.mongoose.conn;
}

export default dbConnect; 