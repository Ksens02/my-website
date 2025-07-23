const WORD_LIST = [
  "apple", "grape", "lemon", "peach", "mango", "berry", "melon", "plumb", "olive", "guava",
  "zebra", "tiger", "eagle", "shark", "whale", "crane", "flame", "sword", "chair", "table",
  "adobe", "angel", "baker", "beach", "beard", "beast", "blaze", "block", "board", "brave",
  "brick", "bring", "broad", "cable", "camel", "candy", "canoe", "caper", "carve", "catch",
  "cause", "charm", "chase", "cheer", "chess", "chief", "child", "claim", "class", "clean",
  "clear", "climb", "clock", "cloud", "coach", "coast", "color", "coral", "couch", "count",
  "cover", "crash", "cream", "creek", "crest", "crisp", "crown", "curve", "cycle", "dance",
  "dealt", "death", "delay", "delta", "demon", "depth", "devil", "diner", "doubt", "draft",
  "drain", "drama", "dream", "dress", "drink", "drive", "eager", "eagle", "earth", "elbow",
  "elder", "elect", "elite", "enjoy", "enter", "equal", "error", "event", "faith", "false",
  "fancy", "fault", "favor", "feast", "fence", "field", "fight", "final", "flame", "flash",
  "fleet", "floor", "focus", "force", "frame", "fresh", "front", "fruit", "giant", "globe",
  "grace", "grain", "grand", "grant", "graph", "grasp", "grass", "great", "green", "greet",
  "grief", "grind", "guard", "guest", "guide", "habit", "happy", "harsh", "heart", "heavy",
  "honor", "horse", "hotel", "house", "human", "humor", "hurry", "ideal", "image", "imply",
  "index", "input", "issue", "jelly", "joint", "judge", "juice", "knock", "label", "labor",
  "laser", "layer", "learn", "lease", "least", "leave", "legal", "level", "light", "limit",
  "liver", "logic", "loose", "lunch", "magic", "major", "maker", "march", "match", "medal",
  "metal", "model", "money", "month", "moral", "motor", "mount", "mouse", "music", "naked",
  "nerve", "night", "noise", "north", "novel", "nurse", "ocean", "offer", "often", "order",
  "organ", "other", "paint", "panel", "paper", "party", "peace", "phase", "phone", "photo",
  "piece", "pilot", "pitch", "place", "plain", "plane", "plant", "plate", "point", "pound",
  "power", "press", "price", "pride", "prime", "print", "prize", "proof", "proud", "queen",
  "quick", "quiet", "radio", "raise", "range", "rapid", "ratio", "reach", "react", "ready",
  "realm", "rebel", "refer", "relax", "reply", "right", "rival", "river", "robot", "rough",
  "round", "route", "royal", "rural", "salad", "scale", "scene", "scope", "score", "scout",
  "sense", "serve", "shade", "shake", "shall", "shape", "share", "sharp", "sheep", "sheet",
  "shelf", "shell", "shift", "shine", "shirt", "shock", "shoot", "shore", "short", "shout",
  "sight", "since", "skill", "slave", "sleep", "slice", "slide", "slope", "small", "smart",
  "smile", "smoke", "snake", "solid", "solve", "sound", "south", "space", "spare", "speak",
  "speed", "spend", "spice", "spite", "split", "spoke", "sport", "staff", "stage", "stake",
  "stamp", "stand", "stare", "start", "state", "steam", "steel", "steep", "steer", "stick",
  "still", "stock", "stone", "store", "storm", "story", "strip", "study", "stuff", "style",
  "sugar", "suite", "super", "sweet", "swing", "sword", "table", "taste", "teach", "teeth",
  "thank", "theme", "thick", "thing", "think", "third", "throw", "tight", "tiger", "title",
  "today", "topic", "total", "touch", "tower", "track", "trade", "train", "treat", "trend",
  "trial", "tribe", "trick", "trust", "truth", "uncle", "union", "unity", "upper", "urban",
  "usage", "usual", "value", "video", "virus", "visit", "vital", "voice", "waste", "watch",
  "water", "wheel", "where", "which", "while", "white", "whole", "woman", "world", "worry",
  "worse", "worst", "worth", "would", "wound", "write", "wrong", "yield", "young", "youth",
  "acorn", "actor", "admit", "adopt", "after", "agent", "aisle", "alarm", "album", "alien",
  "alike", "alley", "allow", "alone", "altar", "amber", "amend", "amuse", "angel", "anger",
  "angle", "ankle", "apart", "apple", "apply", "arena", "argue", "arise", "armor", "aroma",
  "array", "arrow", "asset", "audio", "audit", "avail", "award", "aware", "awful", "bacon",
  "badge", "baker", "balmy", "banjo", "basic", "batch", "beach", "beard", "beast", "begin",
  "being", "belly", "bench", "berry", "birth", "black", "blade", "blank", "blast", "blend",
  "bless", "blind", "blink", "block", "blond", "blood", "bloom", "blown", "blues", "bluff",
  "blunt", "blush", "board", "boast", "bonus", "boost", "booth", "bound", "brain", "brake",
  "brand", "brave", "bread", "break", "breed", "brick", "bride", "brief", "bring", "broad",
  "broke", "brown", "brush", "build", "built", "bunch", "burst", "buyer", "cable", "cabin",
  "cacao", "cache", "caddy", "cadet", "cagey", "cairn", "camel", "canal", "candy", "canoe",
  "canon", "caper", "cargo", "carol", "carve", "catch", "cause", "cease", "cedar", "chain",
  "chair", "chalk", "champ", "chant", "chaos", "charm", "chart", "chase", "cheap", "cheat",
  "check", "cheek", "cheer", "chess", "chest", "chief", "child", "chill", "china", "chirp",
  "choir", "choke", "chord", "chore", "chose", "chunk", "cider", "cigar", "cinch", "civic",
  "civil", "claim", "clamp", "clash", "clasp", "class", "clean", "clear", "cleat", "cleft",
  "clerk", "click", "cliff", "climb", "cling", "cloak", "clock", "clone", "close", "cloth",
  "cloud", "clown", "coach", "coast", "cobra", "cocoa", "colon", "color", "comet", "comic",
  "comma", "conch", "condo", "conic", "coral", "corer", "corny", "couch", "cough", "could",
  "count", "court", "cover", "covet", "crack", "craft", "crane", "crank", "crash", "crate",
  "crave", "crawl", "craze", "crazy", "creak", "cream", "creek", "creep", "crest", "crime",
  "crisp", "crook", "cross", "crowd", "crown", "crude", "cruel", "crumb", "crush", "crust",
  "crypt", "cubic", "cumin", "curly", "curse", "curve", "cycle", "cynic", "daddy", "daily",
  "dairy", "daisy", "dance", "dated", "dealt", "death", "debut", "decay", "decor", "defer",
  "deity", "delay", "delta", "demon", "denim", "dense", "depot", "depth", "derby", "devil",
  "diary", "digit", "diner", "dingy", "diode", "dirty", "ditch", "diver", "divot", "dizzy",
  "dodge", "dogma", "doing", "donor", "donut", "dopey", "doubt", "dough", "dozen", "draft",
  "drain", "drake", "drama", "drank", "drape", "drawl", "drawn", "dream", "dress", "drift",
  "drill", "drink", "drive", "droid", "drone", "drool", "droop", "drove", "drown", "druid",
  "drunk", "dryer", "duvet", "eager", "eagle", "early", "earth", "easel", "eaten", "eater",
  "ebony", "edict", "edify", "eerie", "eight", "elbow", "elder", "elect", "elite", "elope",
  "elude", "email", "embed", "ember", "emcee", "empty", "enact", "endow", "enemy", "enjoy",
  "ennui", "ensue", "enter", "entry", "envoy", "epoch", "epoxy"
];

let SECRET_WORD = "";
let currentAttempt = 0;
const ATTEMPTS = 5;
let guessRows = [];

function pickNewWord() {
  SECRET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
  currentAttempt = 0;
  guessRows = [];
  const board = document.getElementById("wordle-board");
  board.innerHTML = "";
  for (let row = 0; row < ATTEMPTS; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.justifyContent = "center";
    rowDiv.style.gap = "6px";
    let rowLabels = [];
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.textContent = "_";
      cell.style.width = "38px";
      cell.style.height = "38px";
      cell.style.fontSize = "2rem";
      cell.style.background = "#b8c1ec";
      cell.style.color = "#232946";
      cell.style.borderRadius = "6px";
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.fontWeight = "bold";
      rowDiv.appendChild(cell);
      rowLabels.push(cell);
    }
    board.appendChild(rowDiv);
    guessRows.push(rowLabels);
  }
  document.getElementById("wordle-input").value = "";
  document.getElementById("wordle-input").disabled = false;
  document.getElementById("wordle-submit").disabled = false;
  document.getElementById("wordle-again").style.display = "none";
  document.getElementById("wordle-message").textContent = "";
}

function checkGuess() {
  const input = document.getElementById("wordle-input");
  const guess = input.value.trim().toLowerCase();
  if (guess.length !== 5 || !/^[a-zA-Z]{5}$/.test(guess)) {
    document.getElementById("wordle-message").textContent = "Please enter a valid 5-letter word.";
    return;
  }
  // Update row
  for (let i = 0; i < 5; i++) {
    const label = guessRows[currentAttempt][i];
    label.textContent = guess[i];
    if (guess[i] === SECRET_WORD[i]) {
      label.style.background = "#00ffcc";
      label.style.color = "#232946";
    } else if (SECRET_WORD.includes(guess[i])) {
      label.style.background = "#ffb86b";
      label.style.color = "#232946";
    } else {
      label.style.background = "#232946";
      label.style.color = "#e0e0e0";
    }
  }
  currentAttempt++;
  if (guess === SECRET_WORD) {
    document.getElementById("wordle-message").textContent = "Congratulations! You guessed the word!";
    document.getElementById("wordle-input").disabled = true;
    document.getElementById("wordle-submit").disabled = true;
    document.getElementById("wordle-again").style.display = "block";
  } else if (currentAttempt === ATTEMPTS) {
    document.getElementById("wordle-message").textContent = `Out of attempts! The word was: ${SECRET_WORD}`;
    document.getElementById("wordle-input").disabled = true;
    document.getElementById("wordle-submit").disabled = true;
    document.getElementById("wordle-again").style.display = "block";
  } else {
    document.getElementById("wordle-message").textContent = "";
  }
  input.value = "";
}

document.getElementById("wordle-submit").onclick = checkGuess;
document.getElementById("wordle-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkGuess();
});
document.getElementById("wordle-again").onclick = pickNewWord;
document.getElementById("wordle-close").onclick = function() {
  document.getElementById("wordle-modal").style.display = "none";
};

// Show modal when "LetterLogic" is clicked
document.querySelector('#wordle-game .button').onclick = function(e) {
  e.preventDefault();
  document.getElementById("wordle-modal").style.display = "flex";
  pickNewWord();
};
