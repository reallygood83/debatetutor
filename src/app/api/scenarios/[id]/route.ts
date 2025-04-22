import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import type { NextRequest } from 'next/server';

// 특정 ID의 시나리오 조회
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const scenario = await Scenario.findById(params.id);
    
    if (!scenario) {
      return NextResponse.json(
        { error: '시나리오를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: scenario
    });
  } catch (error: any) {
    console.error('시나리오 조회 오류:', error);
    return NextResponse.json(
      { error: '시나리오 조회 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}

// 특정 ID의 시나리오 수정
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    await dbConnect();
    
    // 업데이트 시간 추가
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    const updatedScenario = await Scenario.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedScenario) {
      return NextResponse.json(
        { error: '시나리오를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedScenario
    });
  } catch (error: any) {
    console.error('시나리오 수정 오류:', error);
    return NextResponse.json(
      { error: '시나리오 수정 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}

// 특정 ID의 시나리오 삭제
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedScenario = await Scenario.findByIdAndDelete(params.id);
    
    if (!deletedScenario) {
      return NextResponse.json(
        { error: '시나리오를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: '시나리오가 성공적으로 삭제되었습니다.'
    });
  } catch (error: any) {
    console.error('시나리오 삭제 오류:', error);
    return NextResponse.json(
      { error: '시나리오 삭제 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
} 