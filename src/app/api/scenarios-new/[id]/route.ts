import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/scenario';
import { isValidObjectId } from 'mongoose';

/**
 * 특정 시나리오 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // 유효한 ObjectId 검사
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 시나리오 ID입니다.' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    const scenario = await Scenario.findById(id).lean();
    
    if (!scenario) {
      return NextResponse.json(
        { error: '시나리오를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ scenario }, { status: 200 });
  } catch (error) {
    console.error('Error fetching scenario:', error);
    return NextResponse.json(
      { error: '시나리오를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 시나리오 업데이트
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // 유효한 ObjectId 검사
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 시나리오 ID입니다.' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    const updatedScenario = await Scenario.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedScenario) {
      return NextResponse.json(
        { error: '시나리오를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        message: '시나리오가 성공적으로 업데이트되었습니다.',
        scenario: updatedScenario 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating scenario:', error);
    return NextResponse.json(
      { error: '시나리오 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * 시나리오 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // 유효한 ObjectId 검사
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 시나리오 ID입니다.' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    const deletedScenario = await Scenario.findByIdAndDelete(id).lean();
    
    if (!deletedScenario) {
      return NextResponse.json(
        { error: '시나리오를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: '시나리오가 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting scenario:', error);
    return NextResponse.json(
      { error: '시나리오 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 