export const redirectByRole = (role) => {
  
  if (role === 'Admin') {
    return '/admin';
  }

  if (role === 'Student') {
    return '/';
  }

  if (role === 'Teacher') {
    return '/teacher';
  }
};
