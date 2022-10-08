import { GET_GALLERY } from "../graphql/rickandmorty.queries.js"
import FetchAPI from "../service/FetchAPI.service.js"

class RickAndMortyController{
  #generator
  #fetchService
  /**
   * @param  {FetchAPI} fetchService
   */
  constructor(fetchService){
    this.#fetchService = fetchService
  }
  /**
   * @returns {Promise<any>}
   */
  getPrincipalGallery(){
    const service = this.#fetchService
    async function* createAsyncGenerator(){
      let globalNext = true
      let page = 1
      while(globalNext){
        const res = await service.graphqlQuery('/graphql', GET_GALLERY, {
          page
        })
       
        const data = await res.json()

        const {data:{ characters: {info:{next}, results}}} = data
        globalNext = next
        page++

        yield await Promise.resolve(results)
      }
    }

    if (!this.#generator)
      this.#generator = createAsyncGenerator()
    
    return this.#generator.next()
  }
}

export default RickAndMortyController