const Token = require("../class/Token");

/**
 * ParseLine - Parses a line and returns tokens
 *
 * @param  {String} line The line
 * @return {Token[]} An array of the tokens
 */
module.exports = function ParseLine(line) {
  const tokens = [];
  let gathered = "";
  for (let i = 0; i < line.length; i++) {
    const currentChar = line[i];
    switch (currentChar) {
      case "\"": {
        let skipForward = 1;
        while (i + skipForward < line.length) {
          const char = line[i + skipForward];
          if (char === "\"" && line[i + skipForward - 1] !== "\\") {
            skipForward++;
            break;
          }
          skipForward++;
        }
        gathered += line.slice(i, i + skipForward);
        i += skipForward - 1;
        break;
      }
      case "{": {
        let brackets = 1,
          skipForward = 1,
          isString;
        while(i + skipForward < line.length && brackets > 0) {
          const char = line[i + skipForward];
          switch (char) {
            case "\"": {
              if (isString) {
                if (line[i + skipForward - 1] !== "\\") {
                  isString = false;
                }
              } else {
                isString = true;
              }
              break;
            }
            case "{": {
              if (!isString) {brackets++;}
              break;
            }
            case "}": {
              if (!isString) {brackets--;}
            }
          }
          skipForward++;
        }
        gathered += line.slice(i, i + skipForward);
        i += skipForward - 1;
        break;
      }
      case "[": {
        let brackets = 1,
          skipForward = 1,
          isString;
        while(i + skipForward < line.length && brackets > 0) {
          const char = line[i + skipForward];
          switch (char) {
            case "\"": {
              if (isString) {
                if (line[i + skipForward - 1] !== "\\") {
                  isString = false;
                }
              } else {
                isString = true;
              }
              break;
            }
            case "[": {
              if (!isString) {brackets++;}
              break;
            }
            case "]": {
              if (!isString) {brackets--;}
            }
          }
          skipForward++;
        }
        gathered += line.slice(i, i + skipForward);
        i += skipForward - 1;
        break;
      }
      case " ": {
        tokens.push(new Token(gathered));
        gathered = "";
        break;
      }
      case "\n": {
        return tokens;
      }
      default: {
        gathered += currentChar;
      }
    }
    if (i + 1 >= line.length) {
      tokens.push(new Token(gathered));
    }
  }
  return tokens;
};
