import { GridColDef } from "@mui/x-data-grid"
import { WorldMapTypes } from "../WorldMap/types"

export namespace TableTypes {
    export type TableProps = {
        coordinates: WorldMapTypes.CoordinatedData[]
        title: string
        columns: GridColDef[]
        markerRef: React.RefObject<SVGGElement>
    }
}