import { Feature, Geometry } from "geojson";

export namespace WorldMapTypes {
    export type MapObject = {
        mapFeatures: Array<Feature<Geometry | null>>
    }

    export type CoordinatedData = {
        id: number
        statusColor: number
        name: string
        status: string
        ifChecked: boolean
        latitude: number
        longitude: number
        correctness: string
        notes: string
    }

    // This is the interface of the main function in WorldMap
    export interface IWorldMapProps {
        mapData: MapObject
        mapRef: React.RefObject<SVGSVGElement>
    }
}