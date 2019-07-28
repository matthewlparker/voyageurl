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

export const addURLToLocalStorage = urlData => {
  const visitorURLs = JSON.parse(localStorage.getItem('visitorURLs'));
  const managedVisitorURLs = manageVisitorURLs(visitorURLs, urlData);
  localStorage.setItem('visitorURLs', JSON.stringify(managedVisitorURLs));
  return managedVisitorURLs;
};

const manageVisitorURLs = (visitorURLs, metadata) => {
  if (
    visitorURLs.length > 0 &&
    visitorURLs.some(visitorURL => visitorURL.hash === metadata.hash)
  ) {
    visitorURLs = visitorURLs.filter(
      visitorURL => visitorURL.hash !== metadata.hash
    );
  }
  visitorURLs.unshift(metadata);
  if (visitorURLs.length > 5) {
    visitorURLs.pop();
  }
  return visitorURLs;
};
