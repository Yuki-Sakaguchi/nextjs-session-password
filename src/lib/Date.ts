/**
 * 日付の操作ライブラリのラッパー
 * タイムゾーンを指定したりするので基本的にはここに処理を書いて使うようにする
 */

import { differenceInSeconds, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const VALID_SECONDS = 60 * 60 * 24; // 1日

export function getJstTime() {
  const jstDate = utcToZonedTime(new Date(), 'Asia/Tokyo');
  const now = format(jstDate, 'yyyy-MM-dd HH:mm:ss');
  return now;
}

/**
 * 2つの日付の差分が指定の範囲ないかどうかを返す。有効な場合はtrue
 * @param date1
 * @param date2
 * @returns
 */
export function isValidDate(date1: Date, date2: Date) {
  const diff = differenceInSeconds(date1, date2);
  return VALID_SECONDS > diff;
}

/**
 * 今の時間と対象の時間を比較して有効かどうかを判定する。有効な場合はtrue
 * @param targetDate
 * @returns
 */
export function isValidDateNow(targetDate: Date) {
  const now = getJstTime();
  return isValidDate(new Date(now), targetDate);
}
