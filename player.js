// Blow/draw MIDI pitches for each hole of a C harmonica.
const HOLE_PITCH = {
  1: [60, 62], 2: [64, 67], 3: [67, 71], 4: [72, 74], 5: [76, 77],
  6: [79, 81], 7: [84, 83], 8: [88, 86], 9: [91, 89], 10: [96, 93],
};

let audioCtx = null;

function noteFrequency(note) {
  const pitches = HOLE_PITCH[Math.abs(parseInt(note, 10))];
  if (!pitches) return null;
  const midi = pitches[note.startsWith("-") ? 1 : 0];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function readNumber(key) {
  try {
    return Number(localStorage.getItem(key)) || null;
  } catch (e) {
    return null;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

function createPlayer(song, rhythmBlock) {
  const element = el("div", "player");
  const button = el("button", "play-btn", "▶ Play");
  button.type = "button";

  const tempoBox = el("label", "tempo");
  const tempoText = el("span", "tempo-text");
  const slider = el("input");
  slider.type = "range";
  slider.min = Math.round(song.bpm * 0.4);
  slider.max = Math.round(song.bpm * 1.2);
  slider.step = 1;
  slider.value = readNumber("tempo-" + song.id) || song.bpm;
  slider.setAttribute("aria-label", "Tempo in beats per minute");
  tempoBox.append(el("span", "", "Tempo"), slider, tempoText);

  const countBox = el("label", "opt");
  const countIn = el("input");
  countIn.type = "checkbox";
  countIn.checked = true;
  countBox.append(countIn, " Count-in");

  const loopBox = el("label", "opt");
  const loop = el("input");
  loop.type = "checkbox";
  loopBox.append(loop, " Loop");

  const hint = el("p", "hint", "Tap any note to play from there.");
  element.append(button, tempoBox, countBox, loopBox, hint);

  let session = null;

  function updateTempoText() {
    const pct = Math.round((slider.value / song.bpm) * 100);
    tempoText.textContent = slider.value + " bpm" + (pct === 100 ? "" : " (" + pct + "%)");
  }
  updateTempoText();

  const cells = () => Array.from(rhythmBlock.querySelectorAll(".cell[data-beats]"));

  function voice(dest, freq, start, end, list) {
    const env = audioCtx.createGain();
    env.gain.setValueAtTime(0, start);
    env.gain.linearRampToValueAtTime(1, start + 0.025);
    env.gain.setValueAtTime(0.85, start + 0.08);
    env.gain.setValueAtTime(0.85, end - 0.05);
    env.gain.linearRampToValueAtTime(0, end);

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2400;
    filter.connect(env);
    env.connect(dest);

    const vibrato = audioCtx.createOscillator();
    const depth = audioCtx.createGain();
    vibrato.frequency.value = 5;
    depth.gain.value = freq * 0.003;
    vibrato.connect(depth);

    for (const [type, detune, level] of [["square", 0, 0.5], ["sawtooth", 6, 0.35]]) {
      const osc = audioCtx.createOscillator();
      const mix = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = detune;
      depth.connect(osc.frequency);
      mix.gain.value = level;
      osc.connect(mix).connect(filter);
      osc.start(start);
      osc.stop(end + 0.02);
      list.push(osc);
    }
    vibrato.start(start);
    vibrato.stop(end + 0.02);
    list.push(vibrato);
  }

  function click(dest, time, accent, list) {
    const osc = audioCtx.createOscillator();
    const env = audioCtx.createGain();
    osc.frequency.value = accent ? 1600 : 1100;
    env.gain.setValueAtTime(0.6, time);
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.connect(env).connect(dest);
    osc.start(time);
    osc.stop(time + 0.06);
    list.push(osc);
  }

  // Schedules one pass of the song from cell `from`. Songs are short, so every note is scheduled up front.
  function schedule(from, startAt, withCount) {
    const spb = 60 / slider.value;
    const all = cells();
    let t = startAt;
    const clicks = [];
    if (withCount) {
      for (let i = 0; i < song.countIn; i++) {
        click(session.out, t, i === 0, session.nodes);
        clicks.push(t);
        t += spb;
      }
    }
    const events = [];
    for (let i = from; i < all.length; i++) {
      const cell = all[i];
      const dur = Number(cell.dataset.beats) * spb;
      const freq = cell.dataset.note === "r" ? null : noteFrequency(cell.dataset.note);
      if (freq) voice(session.out, freq, t, t + Math.max(0.06, dur * 0.92), session.nodes);
      events.push({ index: i, cell, start: t, end: t + dur });
      t += dur;
    }
    session.passes.push({ clicks, events, end: t });
  }

  function highlight(cell) {
    if (session.current === cell) return;
    if (session.current) session.current.classList.remove("playing");
    session.current = cell;
    if (!cell) return;
    cell.classList.add("playing");
    const line = cell.parentElement;
    if (line !== session.line) {
      session.line = line;
      const box = line.getBoundingClientRect();
      if (box.top < 60 || box.bottom > innerHeight - 60) {
        const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
        line.scrollIntoView({ block: "center", behavior: smooth ? "smooth" : "auto" });
      }
    }
  }

  function tick() {
    if (!session) return;
    const now = audioCtx.currentTime;
    const pass = session.passes[0];
    const beat = pass.clicks.findIndex((t, i) => now >= t && now < (pass.clicks[i + 1] ?? pass.events[0]?.start ?? pass.end));
    button.textContent = beat >= 0 ? "■ " + (beat + 1) : "■ Stop";
    const event = pass.events.find((e) => now >= e.start && now < e.end);
    highlight(event ? event.cell : null);

    if (now >= pass.end - 0.25 && session.passes.length === 1) {
      if (loop.checked) schedule(0, pass.end, false);
    }
    if (now >= pass.end) {
      session.passes.shift();
      if (!session.passes.length) return stop();
    }
    session.frame = requestAnimationFrame(tick);
  }

  function play(from = 0, withCount = countIn.checked) {
    stop();
    if (!audioCtx) {
      if (navigator.audioSession) navigator.audioSession.type = "playback";
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    audioCtx.resume();
    const out = audioCtx.createGain();
    out.gain.value = 0.18;
    out.connect(audioCtx.destination);
    session = { out, nodes: [], passes: [], current: null, line: null, frame: 0 };
    schedule(from, audioCtx.currentTime + 0.1, withCount);
    button.setAttribute("aria-pressed", "true");
    tick();
  }

  function stop() {
    if (!session) return;
    const { out, nodes, frame } = session;
    cancelAnimationFrame(frame);
    highlight(null);
    session = null;
    const now = audioCtx.currentTime;
    out.gain.setValueAtTime(out.gain.value, now);
    out.gain.linearRampToValueAtTime(0, now + 0.03);
    for (const node of nodes) {
      try {
        node.stop(now + 0.05);
      } catch (e) {}
    }
    setTimeout(() => out.disconnect(), 200);
    button.textContent = "▶ Play";
    button.setAttribute("aria-pressed", "false");
  }

  button.addEventListener("click", () => (session ? stop() : play()));

  slider.addEventListener("input", updateTempoText);
  slider.addEventListener("change", () => {
    saveSetting("tempo-" + song.id, slider.value);
    if (session && session.current) play(cells().indexOf(session.current), false);
  });

  rhythmBlock.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell[data-beats]");
    if (cell) play(cells().indexOf(cell));
  });

  return { element, stop };
}
