import RickAndMortyController from "./controllers/RickAndMortyApi.controller.js";
import CreateGallery from "./service/CreateGallery.service.js";
import FetchAPI from "./service/FetchAPI.service.js";
import { $ } from "./utils/selectors.js";

const FetchInstance = new FetchAPI('https://rickandmortyapi.com')

const FetchController = new RickAndMortyController(FetchInstance)

const CreateGalleryInstance = new CreateGallery($('[data-container="cards"]'))

let isLoading

async function load(){
  isLoading = true
  CreateGalleryInstance.createLoading()
  const { value } = await FetchController.getPrincipalGallery()
  CreateGalleryInstance.deleteLoading()
  CreateGalleryInstance.addData(value)
  isLoading =  false
}

load()

window.addEventListener('scroll',()=>{
  if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && !isLoading)
    load()
})







