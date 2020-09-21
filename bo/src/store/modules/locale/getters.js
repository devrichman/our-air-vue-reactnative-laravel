export default {
  linesByGroup: state => {
    let lines = {}
    if (state.lines.length > 0) {
      state.lines.forEach(item => {
        if (!lines.hasOwnProperty(item.group)) {
          lines[item.group] = []
        }
        lines[item.group].push(item)
      })
    }
    return lines
  }
}
