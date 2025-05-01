/**
 * 현재 시간을 YYYYMMDDHHMMSS 형식의 문자열로 반환합니다.
 */
export function formatDateTime(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

/**
 * YYYYMMDDHHMMSS 형식의 문자열을 Date 객체로 파싱합니다.
 */
export function parseDateTime(dateTimeStr: string): Date {
  if (!/^\d{14}$/.test(dateTimeStr)) {
    throw new Error(
      "날짜 형식이 올바르지 않습니다. YYYYMMDDHHMMSS 형식이어야 합니다."
    );
  }

  const year = parseInt(dateTimeStr.substring(0, 4), 10);
  const month = parseInt(dateTimeStr.substring(4, 6), 10) - 1; // 월은 0-11
  const day = parseInt(dateTimeStr.substring(6, 8), 10);
  const hour = parseInt(dateTimeStr.substring(8, 10), 10);
  const minute = parseInt(dateTimeStr.substring(10, 12), 10);
  const second = parseInt(dateTimeStr.substring(12, 14), 10);

  return new Date(year, month, day, hour, minute, second);
}

/**
 * 주어진 객체의 모든 undefined 값을 제거하여 반환합니다.
 */
export function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

/**
 * 키-값 쌍을 쿼리 문자열로 변환합니다.
 */
export function toQueryString(params: Record<string, any>): string {
  const cleanParams = removeUndefined(params);
  const queryParams = new URLSearchParams();

  Object.entries(cleanParams).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
}
