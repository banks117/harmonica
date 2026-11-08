const SONGS = [
  {
    id: "magnificent-seven",
    title: "The Magnificent Seven",
    short: "Magnificent Seven",
    meta: "Feels like 2 beats per bar, with each bar worth 4 of the beats counted here.",
    tabNote: "Your original tab. It is shorter than the rhythm version, which follows the sheet music and includes the bridge.",
    rhythm: [
      { label: "Part A", lines: ["4:1 r:.5 5:1 5:.5 -4:1", "r:.5 4:1 4:.5 5:.5 5:.5 -4:1", "4:1 r:.5 5:1 5:.5 -4:1", "r:.5 4:.5 4:.5 4:.5 5:.5 5:.5 -4:1"] },
      { label: "Part B", lines: ["5:1 6:5 -6:1 6:1 -5:1 7:7", "5:1 6:5 -6:1 6:1 -5:1 -4:5 4:1 -4:1", "5:1 6:2 -6:1 6:1 5:1 4:2", "r:1 7:1 7:1 -6:1 6:1 -6:1 4:1 -4:1"] },
      { label: "Part A, second version", lines: ["5:1 4:.5 4:1 5:.5 -4:1", "r:.5 4:1 4:.5 5:.5 5:.5 -4:1", "4:1 r:.5 5:1 5:.5 -4:1", "r:.5 4:.5 4:.5 4:.5 5:.5 5:.5 -4:1"] },
      { label: "Bridge", lines: ["4:1 6:4.5 7:1 -6:.5 6:1", "-5:1 -4:4.5 4:1.5 -4:1", "5:1 6:4.5 -6:1 6:.5 5:1", "-4:1 -5:7"] },
      { label: "Part A, third version", lines: ["5:1 4:.5 4:1 5:.5 -4:1", "r:.5 4:1 4:.5 5:.5 5:.5 -4:1", "4:1 r:.5 4:.5 5:.5 5:.5 -4:1", "r:.5 4:.5 4:.5 4:.5 5:.5 5:.5 -4:1"] },
      { label: "Part B again", ref: "Play Part B again." },
      { label: "Ending", ref: "Play Part A, second version, then finish on this note:", lines: ["4:1"] }
    ],
    tab: [
      { label: "Part A, play 2×", lines: ["4 5 5 -4", "4 4 5 5 -4"] },
      { label: "Part B, play 2×", lines: ["5 6 -6 6 -5 7", "5 6 -6 6 -5 -4", "5 6 -6 6 5 4", "7 -6 6 -6 4 -4 5 4"] },
      { label: "Part A, play 2×", lines: ["4 5 5 -4", "4 4 5 5 -4"] }
    ]
  },
  {
    id: "few-dollars-more",
    title: "For a Few Dollars More",
    short: "Few Dollars More",
    meta: "Timing from the video, at about 83 beats per minute. The rest and final note in the ending are the least certain.",
    tabNote: "Your original tab. The rhythm version has the same notes, and plays its two -6s before the fifth line's -7 as one long note.",
    rhythm: [
      { lines: ["5:.5 -6:3 6:1 5:3.5", "-4:.5 5:3 -4:1 -6:2 r:1.5", "5:.5 -6:1 -6:.25 -7:.25 -6:.25 6:.25 -6:.5 -7:.5 7:.5 5:.5", "-6:1 -6:.25 -7:.25 -6:.25 6:.25 -6:.5 6:.5 5:.5 5:.5", "-6:1.25 -7:.25 -6:.25 6:.25 -6:.5 -7:.5 7:.5 -6:.5", "6:.5 6:.5 r:2.5 5:1 -4:.5 -3:2.5 6:.5", "-6:2 5:3 r:2"] },
      { label: "To finish", ref: "Play from the start again and stop on the 7 in the third line." }
    ],
    tab: [
      { lines: ["5 -6 6 5", "-4 5 -4 -6", "5 -6", "-6 -7 -6 6 -6 -7 7", "5 -6", "-6 -7 -6 6 -6 6 5", "5 -6", "-6 -7 -6 6 -6 -7 7", "-6 6 6", "5 -4 -3", "6 -6 5"] }
    ]
  },
  {
    id: "rayman-legends",
    title: "Rayman Legends",
    meta: "Approximate: the timing is measured from a harmonica recording, at about 83 beats per minute. The long rests are where the backing track plays.",
    tabNote: "Your original tab. The rhythm version has the same notes.",
    rhythm: [
      { label: "First section (approximate)", lines: ["-4:.5 -4:.25 -4:.25 -5:.5 6:.5 -6:1 r:6", "-6:.5 -7:.25 7:.25 7:.5 7:.5 7:.5 -8:.5 -6:1 r:7", "-4:.5 -4:.25 -4:.25 -5:.5 6:.5 -6:1 r:6", "-6:.5 -7:.25 7:.25 7:.5 7:.5 7:.5 -8:.5 -6:1 r:6"] },
      { label: "Second section (approximate)", lines: ["-8:.5 7:.5 6:.5 6:.25 6:.25 6:.5", "-5:.5 6:.5 6:.25 6:.25 6:.5", "-5:.5 6:.5 6:.25 6:.25 6:.5 -5:.5 -4:1"] },
      { lines: ["-8:.5 7:.5 6:.5 6:.25 6:.25 6:.5", "-5:.5 6:.5 6:.25 6:.25 6:.5", "-5:.5 6:.5 6:.25 6:.25 6:.5 -5:.5 -4:2"] }
    ],
    tab: [
      { lines: ["-4 -4 -4 -5 6 -6", "-6 -7 7 7 7 7 -8 -6", "-4 -4 -4 -5 6 -6", "-6 -7 7 7 7 7 -8 -6"] },
      { lines: ["-8 7 6 6 6 6", "-5 6 6 6 6", "-5 6 6 6 6 -5 -4"] },
      { lines: ["-8 7 6 6 6 6", "-5 6 6 6 6", "-5 6 6 6 6 -5 -4"] }
    ]
  },
  {
    id: "pecos-bill",
    title: "The Ballad of Pecos Bill",
    short: "Pecos Bill",
    meta: "Timing from the video, at about 180 beats per minute. The video plays the verse, the chorus twice, then all of that again.",
    tabNote: "Your original tab. It has the same notes as the rhythm version.",
    rhythm: [
      { label: "Verse", lines: ["4:1 -4:1 5:1 6:1 5:1 4:1 -4:1 -5:1", "-4:1 -3:1 4:1 3:5", "4:1 -4:1 5:1 6:1 5:1 4:1 -4:1 -5:1", "-4:1 -3:1 4:5"] },
      { label: "Chorus, play 2×", lines: ["4:1 4:1 4:1 -6:2 -5:1 -6:2", "4:1 -5:1 -6:1 -6:1 6:5", "4:1 -4:1 5:1 6:1 5:1 4:1", "-4:1 -5:1 -4:1 -3:1 4:5"] }
    ],
    tab: [
      { lines: ["4 -4 5 6 5 4 -4 -5", "-4 -3 4 3", "4 -4 5 6 5 4 -4 -5", "-4 -3 4"] },
      { label: "Play 2×", lines: ["4 4 4 -6 -5 -6", "4 -5 -6 -6 6", "4 -4 5 6 5 4", "-4 -5 -4 -3 4"] }
    ]
  },
  {
    id: "el-paso",
    title: "El Paso",
    meta: "Timing from the video, at about 146 beats per minute. A waltz, with 3 beats per bar. Count the long holds and rests loosely.",
    tabNote: "Your original tab. It has the same notes as the rhythm version.",
    rhythm: [
      { label: "Verse, play 4×", lines: ["4:1 4:1 5:1 6:1 5:1 4:1", "-4:1 -4:1 -5:1 -6:1 -5:2", "3:1 -3:1 -4:1 -5:1 5:1 -4:1", "-5:1 5:1 -4:1 4:6 r:6"] },
      { label: "Then", lines: ["4:1 -5:1 6:1 -6:2", "-6:1 -6:2 -6:1 -5:3", "4:1 -5:1 6:1 -6:2 -6:1 7:6 8:8 r:8"] },
      { lines: ["4:1 5:1 6:1 7:2 7:1 7:1 -6:1 6:1 5:1 4:1", "4:1 4:1 5:1 6:1", "6:2 6:1 6:2 6:1 -5:4", "5:1 -5:1 6:3 -5:2 -4:1 4:6"] }
    ],
    tab: [
      { label: "Play 4×", lines: ["4 4 5 6 5 4", "-4 -4 -5 -6 -5", "3 -3 -4 -5 5 -4", "-5 5 -4 4"] },
      { label: "Then", lines: ["4 -5 6 -6", "-6 -6 -6 -5", "4 -5 6 -6 -6 7 8"] },
      { lines: ["4 5 6 7 7 7 -6 6 5 4", "4 4 5 6", "6 6 6 6 -5", "5 -5 6 -5 -4 4"] }
    ]
  },
  {
    id: "d-rails",
    title: "D. Rails (Western Ballad)",
    short: "D. Rails",
    meta: "Western Ballad from Dead Rails, by Pierre Jean Gidon. 100 beats per minute, with 2 beats per bar. The score plays this melody twice, holding the final -4 for 8 beats the last time.",
    tabNote: "Your original tab. The rhythm version adds the rests and a quick -8 from the sheet music, plus one extra -4 before the last line.",
    rhythm: [
      { label: "First section", lines: ["-4:.5 r:.5 -4:.5 5:.5 -5:.5 r:.5 -5:.5", "5:.5 -4:.5 r:.5 -4:.5 4:.5 -5:6", "r:2 -4:.5 r:.5 -4:.5 5:.5 -5:.5 r:.5 -5:.5", "6:.5 -6:.5 r:.5 -6:.5 7:.5 -8:.25 -6:3.75"] },
      { label: "Second section", lines: ["r:1.5 6:.25 -5:.25 6:1 r:.5 -4:.5 -4:3 r:1", "-5:1 r:.5 -4:.25 4:.25 -4:6", "r:1.5 6:.25 -5:.25 6:1 r:.5 -4:.5 -4:3 r:.5 -4:.5", "-5:1 r:.5 -4:.25 4:.25 -4:7"] }
    ],
    tab: [
      { lines: ["-4 -4 5 -5 -5", "5 -4 -4 4 -5", "-4 -4 5 -5 -5", "6 -6 -6 7 -6"] },
      { lines: ["6 -5 6 -4 -4", "-5 -4 4 -4", "6 -5 6 -4 -4", "-5 -4 4 -4"] }
    ]
  },
  {
    id: "work-done-this-fall",
    title: "When the Work's All Done this Fall",
    short: "Work's All Done",
    meta: "80 beats per minute on the score. The same melody repeats for each verse.",
    tabNote: "Your original tab. It covers about half of the sheet music's melody, and some of its notes differ.",
    rhythm: [
      { label: "First half", lines: ["6:.5 4:.5 4:.5 5:.5 6:.5 7:.5 7:1 7:.5", "-8:.5 -4:.5 -4:.5 -4:.5 -4:1.5 -4:.5", "-4:.75 5:.25 -5:.5 6:.5 -7:.5 -7:.5 -7:.5 6:.5", "-6:.5 6:.5 6:.5 -5:.5 5:1 6:1"] },
      { label: "Second half", lines: ["4:.5 4:.5 5:.5 6:.5 7:.5 7:1 7:.5", "-8:.5 -5:.5 -5:.5 -5:.5 -5:1.5 5:.5", "-4:.75 5:.25 -5:.5 6:.5 -7:.5 -7:1 6:.5", "-6:.75 -5:.25 6:.5 -4:.5 4:1.5"] }
    ],
    tab: [
      { lines: ["4 4 5 6 7 7", "7 -8 -5 -5 5 -5", "5 -4 -4 5 -5 -7 -7 -7", "6 -6 6 6 -5 5"] }
    ]
  }
];
