import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error(
    'MongoDB URI가 설정되지 않았습니다. 환경 변수를 확인해주세요.'
  );
}

/**
 * 전역 변수에 MongoDB 연결 상태를 저장합니다.
 */
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

// 전역 변수 초기화
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * MongoDB에 연결하는 함수입니다.
 */
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB 연결 성공');
        return mongoose.connection;
      })
      .catch((error) => {
        console.error('MongoDB 연결 실패:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect; 