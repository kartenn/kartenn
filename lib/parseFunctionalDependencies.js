import { get, map, join, flatten } from "lodash"

import remark from "remark"
import rehype from "rehype"
import unified from "unified"
import parse from "rehype-parse"

import visit from "unist-util-visit"
import filter from "unist-util-filter"
import { select, selectAll } from "unist-util-select"
import findAllAfter from "unist-util-find-all-after"

function parseFunctionalDependencies(markdownReadmeText) {
  // Since I'm expecting a markdown text,
  // text is immediatly converted into an abstract syntax tree (AST)
  const markdownTree = parseMarkdown(markdownReadmeText)

  let functionalDependencies = []

  visit(markdownTree, "html", ({ value }) => {
    functionalDependencies.push(...parseFunctionalDependency(value))
  })

  return functionalDependencies
}

function parseFunctionalDependency(htmlText) {
  // HTML gets converted into an AST
  const htmlTree = parseHtml(htmlText)

  let functionalDependencies = []

  visit(htmlTree, { tagName: "details" }, node => {
    const summary =
      select("[tagName=summary] [tagName=a] text", node) ||
      select("[tagName=summary] text", node)

    const contents = selectAll("[tagName=summary] ~ *", node)

    functionalDependencies.push({
      summary: get(summary, "value").replace(new RegExp("^lafourchette/"), ""),
      content: join(map(contents, "value"), " "),
    })
  })

  return functionalDependencies
}

function parseMarkdown(_) {
  return remark()
    .use({ settings: { position: false } })
    .parse(_)
}

function parseHtml(_) {
  return unified()
    .use(parse, {
      fragment: true,
    })
    .use({ settings: { position: false } })
    .parse(_)
}

export default parseFunctionalDependencies
