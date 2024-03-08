import {item} from "@/scripts/redux/slices/productItemsSlice";

export function removeSimilarIds(list: item[]): item[] {
    const uniqueIds = new Set(); // Множество для отслеживания уникальных id
    const filteredList = list.filter(obj => {
        // Если id уже был добавлен в уникальные, не добавляем его в результат
        if (uniqueIds.has(obj.id)) {
            return false;
        }

        // Добавляем id в уникальные
        uniqueIds.add(obj.id);
        return true;
    });

    console.log('sorted', filteredList);
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
    console.log('sortedList ',sortedList)
    return sortedList
}
