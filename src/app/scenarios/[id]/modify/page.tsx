if (type === 'server') {
  try {
    const response = await fetch(`/api/scenarios-new/${id}`);
    
    if (!response.ok) {
      throw new Error('시나리오를 불러오는 중 오류가 발생했습니다.');
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || '서버 응답 오류');
    }
  } catch (error) {
    console.error('서버 응답 오류:', error);
  }
}

try {
  const response = await fetch(`/api/scenarios-new/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedScenario),
  });
  
  if (!response.ok) {
    throw new Error('시나리오 수정 중 오류가 발생했습니다.');
  }
} catch (error) {
  console.error('시나리오 수정 중 오류:', error);
} 