const domainsRegExp = RegExp("(?:domains.)(.+-(?:service|gateway))", "g")

function parseDependenciesFromConfigFile(text) {
  let dependecies = [],
    match = null

  while ((match = domainsRegExp.exec(text))) {
    dependecies.push(match[1])
  }

  return dependecies
}

export default parseDependenciesFromConfigFile
