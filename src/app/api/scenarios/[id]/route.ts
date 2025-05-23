import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/scenario';
import mongoose from 'mongoose';

/**
 * GET: 특정 시나리오 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // ID 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 시나리오 ID입니다.' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const scenario = await Scenario.findById(id);
    
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

/**
 * PUT: 시나리오 업데이트
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // ID 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 시나리오 ID입니다.' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // 업데이트 데이터에 updatedAt 추가
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    const updatedScenario = await Scenario.findByIdAndUpdate(
      id,
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
    console.error('시나리오 업데이트 오류:', error);
    return NextResponse.json(
      { error: '시나리오 업데이트 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE: 시나리오 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // ID 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 시나리오 ID입니다.' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const deletedScenario = await Scenario.findByIdAndDelete(id);
    
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