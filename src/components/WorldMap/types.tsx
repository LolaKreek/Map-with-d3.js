import { Feature, Geometry } from "geojson";

export namespace WorldMapTypes {
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

    export type MapObject = {
        mapFeatures: Array<Feature<Geometry | null>>
    }

    export type ifClick = {
        click: boolean
        coordinates: {
            id: number
            name: string
            status: string
            latitude: number
            longitude: number
        }
    }

    // This is the type for two component arguments: DrawAllMarkersProps and DrawGroupMarkersProps
    export type DrawMarkersProps = {
        radius: number
        coordinatesData?: CoordinatedData[]
        mainCoordinatesArray?: [number, number, number, string, number][]
    }

    // This is the interface of the main function in WorldMap
    export interface IWorldMapProps {
        mapData: MapObject
        coordinatesData: CoordinatedData[]
        scale: number
        cx: number
        cy: number
    }

    export interface coordinatesDataProps {
        statusColor: number
        latitude: number
        longitude: number
        name: string
    }
}