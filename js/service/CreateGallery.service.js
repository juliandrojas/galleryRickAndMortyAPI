class CreateGallery{
  #mainContainer
  #loadingElement
  /**
   * @param  {HTMLElement} mainContainer
   */
  constructor(mainContainer){
    this.#mainContainer = mainContainer
  }

  createLoading(){
    const circularLoading = document.createElement('div')
    circularLoading.appendChild(document.createElement('span'))
    circularLoading.classList.add('circular-loading')

    this.#loadingElement = circularLoading

    this.#mainContainer.parentElement.appendChild(circularLoading)
  }

  deleteLoading(){
    if(this.#loadingElement)
      this.#loadingElement.remove()
  }

  createCard(...children){
    const cardContainer = document.createElement('div')
    cardContainer.classList.add('flex')
    cardContainer.classList.add('flex-column')
    cardContainer.classList.add('flex-center')
    cardContainer.classList.add('flex-between')
    cardContainer.classList.add('card')

    children.forEach(child=>{
      if(child instanceof HTMLElement)
      cardContainer.appendChild(child)

      if(typeof children === 'string')
        cardContainer.textContent = child
    })

    return cardContainer
  }

  createImage(src, alt){
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('img-container')
    const imgElement = document.createElement('img')
    imgElement.src = src
    imgElement.alt = alt
    imgElement.loading= 'lazy'
    imgContainer.appendChild(imgElement)
    
    return imgContainer
  }

  createContent(...rest){
    const mainContainer = document.createElement('ul')
    mainContainer.classList.add('flex')
    mainContainer.classList.add('flex-column')
    mainContainer.classList.add('flex-between')
    mainContainer.classList.add('card-content')

    rest.forEach(info => {
      const itemElement = document.createElement('li')
      const contentElement = document.createElement('p')
      contentElement.classList.add('elipsis')
      contentElement.textContent = info
      itemElement.appendChild(contentElement)

      const tootilpSpan = document.createElement('span')
      tootilpSpan.classList.add('tooltiptext')
      tootilpSpan.textContent = info

      itemElement.appendChild(tootilpSpan)
      mainContainer.appendChild(itemElement)
    })

    return mainContainer
  }

  addData(data){
    data?.forEach(({image,name,status,species, origin})=>{
      const imageElement = this.createImage(image, name + image)
      const cardContent =  this.createContent(
        `Nombre: ${name}`,
        `Status: ${status}`,
        `Especie: ${species}`,
        `Origen: ${origin.dimension ?? 'Desconocido'}`
      )
      
      const card = this.createCard(
        imageElement,
        cardContent
      )
      this.#mainContainer.appendChild(card)
    })
  }
}

export default CreateGallery