
export default {
  // 絵文字除去
  removeEmoji (t) {
    const ranges = [
      '\uD83C[\uDF00-\uDFFF]',
      '\uD83D[\uDC00-\uDE4F]',
      '\uD83D[\uDE80-\uDEFF]',
      '\uD7C9[\uDE00-\uDEFF]',
      '[\u2600-\u27BF]'
    ]
    const reg = new RegExp(ranges.join('|'), 'g')
    return t.replace(reg, '')
  }
}
