'use client'

export function formatEpochToLocalTime(epoch) {
    const date = new Date(epoch);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

export function getUserUTCDifference() {
    const now = new Date();
    const timezoneOffsetHours = Math.round(now.getTimezoneOffset() / 60);

    const prefix = timezoneOffsetHours <= 0 ? "+" : "-";

    return `UTC${prefix}${Math.abs(timezoneOffsetHours)}`;
}