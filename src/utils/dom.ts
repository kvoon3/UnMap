export function handleContainer(maybeEl: string | HTMLElement): HTMLElement {
  if (typeof maybeEl === 'string') {
    const el = document.getElementById(maybeEl)
    if (el !== null) {
      return el
    }
    else {
      const div = document.createElement('div')
      div.innerHTML = maybeEl
      return div
    }
  }
  else {
    return maybeEl
  }
}
