// TODO: Refactor error handling
export const handleLoginErrors = (
  errorMessage,
  setPasswordError,
  setUsernameError
) => {
  if (errorMessage.includes('password')) {
    if (errorMessage.includes('empty')) {
      setPasswordError(`Password can't be empty`);
    } else if (errorMessage.includes('length')) {
      setPasswordError(`Password must be at least 6 characters long`);
    } else if (errorMessage.includes('match')) {
      setPasswordError(`Username and password do not match`);
    }
    return { success: false };
  }
  if (errorMessage.includes('username') || errorMessage.includes('Username')) {
    if (errorMessage.includes('empty')) {
      setUsernameError(`Username can't be empty`);
    } else if (errorMessage.includes('length')) {
      setUsernameError(`Username must be between 3 and 30 characters`);
    } else if (errorMessage.includes('exists')) {
      setUsernameError(`Username already exists`);
    } else if (errorMessage.includes('exist')) {
      setUsernameError(`Username does not exist`);
    }
    return { success: false };
  }
  return { success: false };
};
