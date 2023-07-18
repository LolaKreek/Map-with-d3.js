import { WorldMapTypes } from "../WorldMap/types"

export namespace MapLegendTypes {
    export type MapLegendProps = {
        coordinates: WorldMapTypes.CoordinatedData[]
        markerRef: React.RefObject<SVGGElement>
    }
}