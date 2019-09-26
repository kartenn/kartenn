import { map, flatten, uniq } from "lodash"

import {
  TEAM_NODE_KIND,
  USER_NODE_KIND,
} from "../components/Graph/useSimulation"

const parseCodeOwners = text => {
  let entries = []
  let lines = text.split("\n")

  for (let line of lines) {
    let [content, comment] = line.split("#")
    let trimmed = content.trim()
    if (trimmed === "") continue
    let [pattern, ...owners] = trimmed.split(/\s+/)

    entries.push({ pattern, owners })
  }

  return map(uniq(flatten(map(entries, "owners"))), owner => ({
    kind: owner.includes("@lafourchette/") ? TEAM_NODE_KIND : USER_NODE_KIND,
    name: owner.replace(new RegExp("^@(lafourchette/)?"), ""),
  }))
}

export default parseCodeOwners
