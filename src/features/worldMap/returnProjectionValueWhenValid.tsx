import { geoEquirectangular } from 'd3';
const projection = geoEquirectangular();

function returnProjectionValueWhenValid(point: [number, number], index: number){
    const returnValue: [number, number] | null = projection(point)
    if (returnValue?.length){
      return returnValue[index]
    }
    return 0
}

export default returnProjectionValueWhenValid;