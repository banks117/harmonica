const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

function lengthLabel(beats) {
  const whole = Math.floor(beats);
  const frac = beats - whole;
  if (!frac) return String(whole);
  return (whole || "") + FRACTIONS[frac];
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function noteCell(note, label) {
  const cell = el("span", "cell");
  const kind = note === "r" ? " is-rest" : note.startsWith("-") ? " is-draw" : "";
  cell.append(el("span", "note" + kind, note));
  if (label !== undefined) cell.append(el("span", "len", label));
  return cell;
}

function rhythmLine(line) {
  const row = el("div", "line");
  let previous = null;
  for (const token of line.split(" ")) {
    const [note, raw] = token.split(":");
    const beats = Number(raw);
    const label = raw === undefined ? "?" : beats === previous ? "" : lengthLabel(beats);
    const cell = noteCell(note, label);
    cell.dataset.note = note;
    cell.dataset.beats = beats;
    row.append(cell);
    previous = beats;
  }
  return row;
}

function plainLine(line) {
  const row = el("div", "line");
  for (const note of line.split(" ")) row.append(noteCell(note));
  return row;
}

function partsBlock(parts, makeLine, extraClass) {
  const box = el("div", "lines-group " + extraClass);
  box.style.display = "grid";
  box.style.gap = "1.5rem";
  for (const part of parts) {
    const wrap = el("div", "part");
    if (part.label) wrap.append(el("h3", "", part.label));
    if (part.ref) wrap.append(el("p", "ref", part.ref));
    if (part.lines) {
      const lines = el("div", "lines");
      for (const line of part.lines) lines.append(part.plain ? plainLine(line) : makeLine(line));
      wrap.append(lines);
    }
    box.append(wrap);
  }
  return box;
}

function readView(id) {
  try {
    return localStorage.getItem("view-" + id);
  } catch (e) {
    return null;
  }
}

function saveView(id, value) {
  try {
    localStorage.setItem("view-" + id, value);
  } catch (e) {}
}

function renderSong(song) {
  const section = el("section", "song");
  section.id = song.id;
  const head = el("div", "song-head");
  head.append(el("h1", "", song.title));
  section.append(head);

  const plainBlock = partsBlock(song.tab, plainLine, "plain");
  if (!song.rhythm) {
    section.append(el("p", "meta", "Notes only for now. Rhythm not added yet."), plainBlock);
    return section;
  }

  const meta = el("p", "meta", song.meta);
  const rhythmBlock = partsBlock(song.rhythm, rhythmLine, "");
  const tabNote = el("p", "meta", song.tabNote);
  const view = el("div", "view");
  view.setAttribute("role", "group");
  view.setAttribute("aria-label", "Show " + song.title + " as");
  const withLengths = el("button", "", "With rhythm");
  const notesOnly = el("button", "", "Notes only");
  withLengths.id = song.id + "-rhythm";
  notesOnly.id = song.id + "-notes";
  withLengths.type = notesOnly.type = "button";
  view.append(withLengths, notesOnly);
  head.append(view);
  const player = createPlayer(song, rhythmBlock);
  section.append(meta, player.element, tabNote, rhythmBlock, plainBlock);

  function show(mode) {
    const rhythm = mode !== "notes";
    if (!rhythm) player.stop();
    rhythmBlock.hidden = meta.hidden = player.element.hidden = !rhythm;
    plainBlock.hidden = tabNote.hidden = rhythm;
    withLengths.setAttribute("aria-pressed", String(rhythm));
    notesOnly.setAttribute("aria-pressed", String(!rhythm));
  }
  withLengths.addEventListener("click", () => { show("rhythm"); saveView(song.id, "rhythm"); });
  notesOnly.addEventListener("click", () => { show("notes"); saveView(song.id, "notes"); });
  show(readView(song.id));
  return section;
}
