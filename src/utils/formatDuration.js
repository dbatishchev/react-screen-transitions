/**
 * @param {number} n
 * @return {string}
 */
function pad(n) {
  return String(n < 10 ? `0${n}` : n);
}

/**
 * @param {number} ms
 * @return {string}
 */
export default function formatDuration(ms) {
  const secs = ms / 1000;

  const m = Math.floor(secs / 60);
  const s = Math.floor(secs - m * 60);

  return `${m}:${pad(s)}`;
}
