export function createAction(type, data) {
  return {type, data}
}

export function createActions(type, dataList) {
  return dataList.map((data) => ({type, data}))
}