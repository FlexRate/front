function formatStringToDate(dateString: string): Date {
  const parsedDate = new Date(dateString);

  // // Date 객체가 유효한지 확인
  // if (isNaN(parsedDate.getTime())) {
  //   return null; // 유효하지 않은 날짜라면 null 반환
  // }

  return parsedDate;
}

export default formatStringToDate;
