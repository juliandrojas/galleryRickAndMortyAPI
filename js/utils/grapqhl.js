export function parse(document, variables){
  const [operationNameRaw] = document.match(/query.+\(/)

    if(!operationNameRaw) throw new Error('Not Valid Query')

  return JSON.stringify({
    operationName: operationNameRaw
      .replace(/query|\(/g, '')
      .trim(),
    query: document,
    variables
  })

}
