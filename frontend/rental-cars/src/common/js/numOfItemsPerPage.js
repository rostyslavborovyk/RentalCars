export const getNumOfItemsPerPage = () => {
  const tableHeaderRect = document.getElementById("items-table-header").getBoundingClientRect()
  const bottomPos = tableHeaderRect.height + tableHeaderRect.y
  const itemHeight = tableHeaderRect.height
  const windowHeight = window.innerHeight
  return parseInt((windowHeight - bottomPos) / itemHeight) - 2
}
