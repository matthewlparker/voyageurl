export const truncate = (str, maxLength, separator = ' ') => {
  if (str.length <= maxLength) return str;
  if (str.indexOf(separator) < 0) return str.substring(0, maxLength) + '...';
  let truncatedString = str.substring(0, str.lastIndexOf(separator, maxLength));
  if (!truncatedString) return str.substring(0, maxLength) + '...';
  truncatedString = trimNonAlphaNumericChars(truncatedString);
  return truncatedString + '...';
};

const trimNonAlphaNumericChars = str => {
  let trimmedString;
  let code = str.charCodeAt(str.length - 1);
  if (
    !(code > 47 && code < 58) &&
    !(code > 64 && code < 91) &&
    !(code > 96 && code < 123)
  ) {
    trimmedString = str.substring(0, str.length - 1);
    return trimNonAlphaNumericChars(trimmedString);
  } else {
    return str;
  }
};
