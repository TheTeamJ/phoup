const toList = (x) => {
  const li = [];
  if (Array.isArray(x)) {
    li.push(...x);
  } else {
    li.push(x);
  }
  return li;
};

const printCount = (i, len, iter = 10, prefix = "") => {
  if (iter === 0) {
    return;
  }
  const j = i + 1;
  if (j % iter === 0 || j === len) {
    console.log(`${prefix} ${j} /${len}`);
  }
};

module.exports = {
  toList,
  printCount,
};
