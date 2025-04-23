import mongoose, { Schema, models, model } from 'mongoose';

// 활동 스키마
const ActivitySchema = new Schema({
  id: String,
  title: String,
  durationMinutes: Number,
  description: String,
  teacherPrompts: [String]
});

// 스테이지 섹션 스키마
const StageSectionSchema = new Schema({
  id: String,
  title: String,
  activities: [ActivitySchema]
});

// 시나리오 스키마
const ScenarioSchema = new Schema({
  title: {
    type: String,
    required: [true, '토론 주제를 입력해주세요.'],
    trim: true
  },
  totalDurationMinutes: {
    type: Number,
    required: [true, '총 토론 시간을 입력해주세요.'],
    min: [10, '최소 10분 이상의 시간이 필요합니다.']
  },
  groupCount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  stages: {
    stage1: StageSectionSchema,
    stage2: StageSectionSchema,
    stage3: StageSectionSchema
  },
  // AI로 생성된 추가 정보
  aiGenerated: {
    type: Boolean,
    default: false
  },
  scenarioDetails: {
    background: String,
    proArguments: [String],
    conArguments: [String],
    teacherTips: String,
    keyQuestions: [String]
  }
});

// 모델이 이미 있는지 확인하고 없으면 생성
export default models.Scenario || model('Scenario', ScenarioSchema);
