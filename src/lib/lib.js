const toList = (x) => {
  const li = [];
  if (Array.isArray(x)) {
    li.push(...x);
  } else {
    li.push(x);
  }
  return li;
};

module.exports = {
  toList,
};
