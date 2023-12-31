import { reactive, html } from "../../../js/arrow.js";

const sec = 1000;
const min = 60 * sec;
const hour = 60 * min;

const pad = (n: number, p = "0"): string => n.toString().padStart(2, p);
const makeTimeFormat = (div: number, mod: number) => time => pad(Math.floor(time / div) % mod);

const timeFormats = [
  makeTimeFormat(hour, 24),
  makeTimeFormat(min, 60),
  makeTimeFormat(sec, 60),
  makeTimeFormat(1, 1000),
];

const getTimeDisplays = time => timeFormats.map(fn => fn(time));

const update = store => () => {
  const [hr, min, sec, ms] = getTimeDisplays((store.elapsed = Date.now() - store.start));
  store.display = `${hr}:${min}:${sec}:${ms}`;
};

export const Timer = (mode = "default", opts?: any) => {
  const timerStore = reactive({
    start: Date.now(),
    elapsed: 0,
    display: "00:00:00:00",
    mode,
    ...opts,
  });

  const attachTimer = html`<div id="timer">
    <div id="timer-display">${() => timerStore.display}</div>
  </div>`;

  const startTimer = (element, mode_override?: string) => {
    if (mode_override) timerStore.mode = mode_override;
    console.log("starting timer mode:", timerStore.mode);
    const timerInterval = setInterval(update(timerStore), 100);
    attachTimer(element);
    return timerInterval;
  };

  return [startTimer, timerStore];
};
