export const GET_GALLERY = `query characters($page: Int){
  characters(page:$page) {
    info{
      pages
      next
    }
    results {
      image
      name
      status
      species
      origin{
        dimension
      }
    }
  }
 }`