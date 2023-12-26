import type { ILayer, ILayerOption, IMap, IMapOption, IMarker, IMarkerOption, ISDK } from '../../sdk'

export class AiMapSDK implements ISDK {
  Map(opt: IMapOption): IMap {
    throw new Error('Method not implemented.')
  }

  Layer(opt: ILayerOption): ILayer {
    throw new Error('Method not implemented.')
  }

  Popup(opt: ILayerOption): ILayer {
    throw new Error('Method not implemented.')
  }

  Marker(opt?: IMarkerOption | undefined): IMarker {
    throw new Error('Method not implemented.')
  }

  load(url: string, href: string): void {
    const script = document.createElement('script')
    script.setAttribute('src', url)
    script.setAttribute('defer', '')
    script.setAttribute('async', 'async')

    const link = document.createElement('link')
    link.setAttribute('href', href)
    document.body.appendChild(script)
    document.head.appendChild(link)
  }
}
