import { WorldMapTypes } from "../WorldMap/types"

export namespace MarkersTypes {
    export type MarkersProps = {
        coordinates: WorldMapTypes.CoordinatedData[]
        radius: number
    }

    export type OneMarkerProps = {
        data: WorldMapTypes.CoordinatedData
        radius: number
    }
}