import { parse } from "../utils/grapqhl.js"

class FetchAPI{
  #baseUrl
  #universalConfig
  /**
   * @param  {string} baseUrl
   * @param  {Omit<RequestInit, 'method'>} universalConfig
   */
  constructor(baseUrl, universalConfig){
    if(!baseUrl || typeof baseUrl !== 'string')
      throw new Error('not valid argument')
    this.#baseUrl = baseUrl
    this.#universalConfig = universalConfig
  }
  
  /** 
   * @param  {string} url
   * @param  {string} method
   * @param  {Omit<RequestInit, 'method'>} config
   */
  #request(url, method, config){
    return fetch(new Request(this.#baseUrl+url, {
      method,
      ...this.#universalConfig,
      ...config
    }))
  }

  /**
   * @param  {string} url
   * @param  {Omit<RequestInit, 'method'>} config
   */
  get(url, config){
    return this.#request(url, 'GET', config)
  }

  /**
   * @param  {string} url
   * @param  {Omit<RequestInit, 'method'>} config
   */
  post(url, config){
    return this.#request(url, 'POST', config)
  }

  /**
   * @param  {string} url
   * @param  {string} query
   * @param  {any} variables
   */
  graphqlQuery(url, query, variables){
    return this.post(url, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: parse(query, variables)
    })
  }
}

export default FetchAPI