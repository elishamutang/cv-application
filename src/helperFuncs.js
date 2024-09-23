export default function getLargestId(arr) {
  const getIds = arr.map((item) => item.id);

  return Math.max(...getIds);
}
