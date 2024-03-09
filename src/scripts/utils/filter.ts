import {item} from "@/scripts/redux/slices/productItemsSlice";

export function removeSimilarIds(list: item[]): item[] {
    const uniqueIds = new Set();
    const filteredList = list.filter(obj => {
        if (uniqueIds.has(obj.id)) {
            return false;
        }
        uniqueIds.add(obj.id);
        return true;
    });
    return filteredList;
}

export function setOnePage(fullListOfIds: []):[][]{
    let sortedList: [][] = [[]];
    let counter = 0
    for(let i = 0; i < fullListOfIds.length; i++) {
        if(i > 0 && i % 50 === 0){
            sortedList[counter].push(fullListOfIds[i])
            sortedList.push([])
            counter += 1
        }
        else sortedList[counter].push(fullListOfIds[i])
    }
    return sortedList
}
