import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/scenario';

/**
 * 모든 시나리오 조회
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const scenarios = await Scenario.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ scenarios }, { status: 200 });
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    return NextResponse.json(
      { error: '시나리오 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 새 시나리오 생성
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 필수 필드 검사
    if (!data.title || !data.topic) {
      return NextResponse.json(
        { error: '제목과 주제는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    const newScenario = new Scenario(data);
    await newScenario.save();
    
    return NextResponse.json(
      { 
        message: '시나리오가 성공적으로 생성되었습니다.',
        scenario: newScenario.toObject(),
        id: newScenario._id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating scenario:', error);
    return NextResponse.json(
      { error: '시나리오 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 