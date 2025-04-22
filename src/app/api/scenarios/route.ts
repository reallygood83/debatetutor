import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';

// 모든 시나리오 조회
export async function GET() {
  try {
    await dbConnect();
    const scenarios = await Scenario.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: scenarios
    });
  } catch (error: any) {
    console.error('시나리오 조회 오류:', error);
    return NextResponse.json(
      { error: '시나리오 조회 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}

// 새 시나리오 저장
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    
    // 시나리오 생성
    const scenario = new Scenario({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // 저장
    const savedScenario = await scenario.save();
    
    return NextResponse.json({
      success: true,
      data: savedScenario
    }, { status: 201 });
  } catch (error: any) {
    console.error('시나리오 저장 오류:', error);
    return NextResponse.json(
      { error: '시나리오 저장 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
} 