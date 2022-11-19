function formatName(name) {
  return name.trim().replace(/ +/g, ' ');
}

function createSlug(name) {
  return name.toLowerCase().trim().replace(/ +/g, '-');
}

export { createSlug, formatName };
