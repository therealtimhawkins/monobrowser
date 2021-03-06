import { Scraper } from './scraper.types'
import isEmpty from 'lodash.isempty'

class Scraper {
  document: Document

  constructor(document: Document) {
    this.document = document
  }

  get(element: Scraper.Element) {
    if (element.tag) return this.getByTag(element.tag)
    if (element.className) return this.getByClass(element.className)
    return []
  }

  getByTag(tag: string) {
    return this.document.getElementsByTagName(tag) || []
  }

  getByClass(className: string) {
    return this.document.getElementsByClassName(className) || []
  }

  getInnerHtmlData(html: string, elements: Scraper.Elements) {
    const dom = new DOMParser().parseFromString(html, 'text/html')
    const response: Scraper.Elements = {}
    Object.keys(elements).forEach(key => {
      const element = dom.getElementsByClassName(elements[key])[0]
      if (element) response[key] = (<HTMLElement>element).innerText
    })
    if (!isEmpty(response)) return response
    else return
  }

  getListData(listSelector: Scraper.Element , elements: Scraper.Elements) {
    const list: any = this.get(listSelector)
    if (!list) return
    const parsedList: Array<Scraper.Elements> = []
    for (const listItem of list) {
      const html = listItem.innerHTML
      const data = this.getInnerHtmlData(html, elements)
      if (data) parsedList.push(data)
    }
    return parsedList
  }
}

export default Scraper
