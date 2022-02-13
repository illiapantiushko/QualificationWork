export const redirectByRole = (roles) => {
  const firstRole = roles[0];

  if (firstRole === 'Admin') {
    return 'Admin';
  }

  if (firstRole === 'Student') {
    return 'Student';
  }

  if (firstRole === 'Teacher') {
    return 'Teacher';
  }
};
