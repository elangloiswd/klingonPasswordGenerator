const password_el = document.querySelector("#password");
document.querySelector("#password").value = "tlhIngan maH!";
const length_el = document.querySelector("#length");
const uppercase_el = document.querySelector("#uppercase");
const lowercase_el = document.querySelector("#lowercase");
const number_el = document.querySelector("#number");
const symbol_el = document.querySelector("#symbol");

const generate_btn = document.querySelector("#generate");
generate_btn.addEventListener("click", GeneratePassword);
const copy_btn = document.querySelector("#copy");
copy_btn.addEventListener("click", CopyPassword);

const speech = document.getElementById("speech");
const klingonWords = [
  "nuqneh",
  "majaa",
  "tlhingan",
  "ghobe",
  "habsosli",
  "qapla",
  "vaqjaj",
  "petaq",
  "hiq",
  "duj",
  "saavik",
  "bortas",
  "pagh",
  "batlh",
  "vabdot",
  "qoh",
  "yintagh",
  "cha",
  "iw",
  "ghiqtal",
  "molor",
  "borit",
  "hadibah",
  "puqlod",
  "qagh",
  "mong",
  "vah",
  "dah",
  "pItlh",
  "tagh",
  "maqmigh",
  "hoh",
  "bilugh",
  "qovpatlh",
  "suvwi",
  "targh",
  "nib",
  "pemeh",
  "tuq",
  "veqlargh",
  "qotmagh",
  "doha",
  "tlhub",
  "quv",
  "nob",
  "daghtuj",
  "pubeh",
  "rej",
  "yuv",
  "boq",
  "chadich",
  "deg",
  "dujdaj",
  "chaw",
  "dal",
  "dir",
  "gher",
  "Hegh",
  "jeq",
  "lin",
  "min",
  "nov",
  "pegh",
  "qam",
  "qu",
  "tir",
  "vagh",
  "wov",
  "xut",
  "yaj",
  "je",
  "mej",
  "nop",
  "poH",
  "qim",
  "ritlh",
  "soj",
  "tlhutlh",
  "vitlhutlh",
];

const numbercase_char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolcase_char = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "?",
  "&",
  "*",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  "/",
  "|",
  "-",
  "_",
  ":",
];
const uppercase_char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase_char = "abcdefghijklmnopqrstuvwxyz";
function GeneratePassword() {
  let password = "";
  let totalLength = parseInt(length_el.value);

  const hasNumber = number_el.checked;
  const hasSymbol = symbol_el.checked;
  const isUppercase = uppercase_el.checked;
  const isLowercase = lowercase_el.checked;

  let isMixedCase = false;
  if (isUppercase && isLowercase) {
    isMixedCase = true;
  }

  if (!hasNumber && !hasSymbol && !isUppercase && !isLowercase) {
    speech.textContent = "Click a Checkbox!";
    return;
  }

  if (!isUppercase && !isLowercase) {
    speech.textContent = "No letter? No PASSWORD!";
    return;
  }

  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function containsNumber(password) {
    return /\d/.test(password);
  }

  function containsSymbol(password) {
    return /[^\w\s]/.test(password);
  }

  function generateComponent() {
    if (hasNumber && !containsNumber(password)) {
      return getRandomElement(numbercase_char);
    } else if (hasSymbol && !containsSymbol(password)) {
      return getRandomElement(symbolcase_char);
    } else if (hasNumber && hasSymbol) {
      if (Math.random() < 0.5) {
        return getRandomElement(klingonWords);
      } else {
        return getRandomElement(
          hasNumber && hasSymbol
            ? [...numbercase_char, ...symbolcase_char]
            : hasNumber
            ? numbercase_char
            : symbolcase_char
        );
      }
    } else {
      return getRandomElement(
        isUppercase && isLowercase
          ? klingonWords
          : isUppercase
          ? uppercase_char
          : lowercase_char
      );
    }
  }

  while (password.length < totalLength) {
    const component = generateComponent();
    const remainingLength = totalLength - password.length;

    if (component.length <= remainingLength) {
      password += component;
    } else {
      password = "";
    }
  }

  if (isMixedCase) {
    password = shuffleStringCase(password);
  } else if (isUppercase) {
    password = password.toUpperCase();
  } else if (isLowercase) {
    password = password.toLowerCase();
  }

  if (totalLength < 16) {
    speech.textContent = "So WEAK!";
  } else {
    speech.textContent = "Glorious Password!";
  }
  password_el.value = password;

  setTimeout(() => {
    console.clear();
    console.log("length: " + password_el.value.length);
    const containsLowercase = /[a-z]/.test(password_el.value);
    const containsUppercase = /[A-Z]/.test(password_el.value);
    console.log("upper " + /^[A-Z]+$/.test(password_el.value));
    console.log("lower " + /^[a-z]+$/.test(password_el.value));
    console.log("Mixed: " + (containsLowercase && containsUppercase));
    console.log("number " + /\d/.test(password_el.value));
    console.log("symbol " + /[^\w\s]/.test(password_el.value));
  }, 100);
}

function shuffleStringCase(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const randomCase =
      Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
    result += randomCase;
  }
  return result;
}

async function CopyPassword() {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(password_el.value);
    speech.textContent = "Password has been copied to your clipboard.";
  }
}
