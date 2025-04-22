export interface Activity {
  id: string;
  title: string;
  durationMinutes: number;
  description: string;
  teacherPrompts: string[];
}

export interface StageSection {
  id: string;
  title: string;
  activities: Activity[];
}

export interface Scenario {
  id: string;
  title: string;
  totalDurationMinutes: number;
  groupCount?: number;
  createdAt: Date;
  updatedAt: Date;
  stages: {
    stage1: StageSection; // 다름과 마주하기
    stage2: StageSection; // 다름을 이해하기
    stage3: StageSection; // 다름과 공존하기
  };
}

export type ScenarioFormData = {
  title: string;
  totalDurationMinutes: number;
  groupCount?: number;
}; 