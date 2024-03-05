
export function setOnePage(fullListOfIds: []):[][]{
    let sortedList: [][] = [[]];
    let counter = 0
    for(let i = 0; i < fullListOfIds.length; i++) {
        if(i > 0 && i % 49 === 0){
            sortedList[counter].push(fullListOfIds[i])
            sortedList.push([])
            counter += 1
        }
        else sortedList[counter].push(fullListOfIds[i])
    }
    console.log('sortedList ',sortedList)
    return sortedList
}
