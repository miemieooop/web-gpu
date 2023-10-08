const _face_vertex_data_separator_pattern = /\s+/

const load = async (url: string) => {
  const text = await (await fetch(url)).text()
  return parse(text)
}

type Vertice = {
  x: number
  y: number
  z: number
}

const parse = (text: string) => {
  const vertices: Vertice[] = []
  const faceVertices = []
  if (text.indexOf('\r\n') !== -1) {
    // 替换所有\r\n为\n
    text = text.replace(/\r\n/g, '\n')
  }

  if (text.indexOf('\\\n') !== -1) {
    // 替换所有\\\n为空
    text = text.replace(/\\\n/g, '')
  }
  const lines = text.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimStart()
    if (line.length === 0) continue
    const lineFirstChar = line.charAt(0)
    if (lineFirstChar === '#') continue

    if (lineFirstChar === 'v') {
      const data = line.split(_face_vertex_data_separator_pattern)
      if (data[0] == 'v') {
        vertices.push({
          x: parseFloat(data[1]),
          y: parseFloat(data[2]),
          z: parseFloat(data[3])
        })
      } else {
        continue
      }
    } else if (lineFirstChar === 'f') {
      const lineData = line.slice(1).trim()
      const vertexData = lineData.split(_face_vertex_data_separator_pattern)
      const fVertices = []
      for (let j = 0, jl = vertexData.length; j < jl; j++) {
        const vertex = vertexData[j]
        if (vertex.length > 0) {
          const vertexParts = vertex.split('/')
          fVertices.push(vertexParts)
        }
      }
      faceVertices.push(fVertices)
    }
  }

  return { vertices, faceVertices }
}

export { load, parse }
