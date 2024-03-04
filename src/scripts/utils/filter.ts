export function setOnePage(fullListOfIds: any){
    let sortedList: any[][] = [[]];
    let counter = 0
    for(let i = 0; i < fullListOfIds.length; i++) {
        if(i > 1 && i % 50 === 0 && counter === 0){
            counter += 1
            sortedList.push([])
        } else if(i % 51 === 0 && counter > 0){
            counter += 1
            sortedList.push([])
        } else {
            sortedList[counter].push(fullListOfIds[i])
        }
    }
    console.log('sortedList ',sortedList)
    return sortedList
}
