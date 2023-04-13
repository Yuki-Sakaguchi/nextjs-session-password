import { atom } from 'jotai';
import { User } from '../session';

/**
 * User      : ログイン確認後、ログイン済み、ユーザーデータ
 * null      : ログイン確認後、未ログイン
 * undefined : ログイン確認前
 */
export const currentUserState = atom<User | undefined | null>(undefined);
