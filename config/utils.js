function formatName(name) {
  return name.trim().replace(/ +/g, ' ');
}

function createSlug(name) {
  return name.toLowerCase().trim().replace(/ +/g, '-');
}

function getPaginationRange(page, size = 5) {
  const rangeInterval = size * page;

  const from = page === 1 ? 0 : rangeInterval - size;
  const to = rangeInterval - 1;

  return { from, to };
}
export { createSlug, formatName, getPaginationRange };
