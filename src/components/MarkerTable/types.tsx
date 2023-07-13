import { WorldMapTypes } from "../WorldMap/types"

export namespace TableTypes {
    export type TableProps = {
        data: WorldMapTypes.CoordinatedData[]
        title: string
    }
}