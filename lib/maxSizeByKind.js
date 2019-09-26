function maxSizeByKind(nodes, givenKind) {
  return Math.max(
    ...nodes
      .filter(({ kind }) => kind === givenKind)
      .map(({ size }) => size)
      .filter(n => !!n)
  )
}

export default maxSizeByKind
