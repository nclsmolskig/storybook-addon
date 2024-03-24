import { dataOrigins, MESSAGES, uiTypes } from "./constants";
import { API_DocsEntry, API_StoryEntry } from "@storybook/types";
import { DependencyGraph, DepGraphParams, NpmPackage } from "./types";

function sanitizePackageName(packageName: string): string {
  return packageName.replace('@', '') //TODO @ should not be hardcoded. Check if mermaid already has a sanitizing function for strings
}

function normalizeNpmGraph(packageData: NpmPackage, include: string) {
  function getDependencies(packageData: NpmPackage, graph: DependencyGraph, include: string): string[] {
    if (!packageData?.dependencies) {
      return []
    }

    const packageNameList: string[] = []
    for (const [key, value] of Object.entries(packageData.dependencies)) {
      if (include && !key.includes(include)) {
        continue;
      }

      packageNameList.push(key)
      const subDependencies = getDependencies(value, graph, include)
      if (graph.has(key)) {
        const currentSet = graph.get(key);
        for (const packageName of subDependencies) {
          currentSet.add(packageName);
        }
      } else {
        graph.set(key, new Set(subDependencies))
      }
    }

    return packageNameList
  }

  const graph: DependencyGraph = new Map();
  getDependencies(packageData,graph,include);
  return graph;
}
function normalizeGraph(params: DepGraphParams){
  switch (params.dataOrigin){
    case dataOrigins.npm: {
      return normalizeNpmGraph(params.data, params.config?.include)
    }
    default: {
      return null;
    }
  }
}

function renderMermaidDiagram(dependencyMap: DependencyGraph){
  const diagramType = 'flowchart TD' //TODO Isolate Mermaid rendering functions and allow passing diagram type using ENUM
  const edges = '-->' //TODO same as above, should not be hard coded. Consider -- text --> and ------> (longer lines)
  const lineBreak = '\n'
  const graph = [diagramType]

  for(const [packageName, dependencies] of Array.from(dependencyMap)) {
    for(const dependencyName of Array.from(dependencies)){
      graph.push(`${sanitizePackageName(packageName)}${edges}${sanitizePackageName(dependencyName)}`)
    }
  }

  return graph.join(lineBreak)
}
function getGraphRenderByUIType(normalizedGraph: DependencyGraph, params: DepGraphParams){
  switch (params.uiType){
    case uiTypes.mermaid: {
      return renderMermaidDiagram(normalizedGraph)
    }
    default: {
      return MESSAGES.NO_UI_AVAILABLE
    }
  }
}

function getGraphRender(params: DepGraphParams, storyData: API_DocsEntry | API_StoryEntry) {
  if(!params.data || !Object.keys(params.data).length ) {
    return MESSAGES.NO_DATA
  }
  const normalizedGraph = normalizeGraph(params);
  return getGraphRenderByUIType(normalizedGraph, params) //TODO consider function returning a ReactComponent with render instead of string
}

export {
  getGraphRender
}
