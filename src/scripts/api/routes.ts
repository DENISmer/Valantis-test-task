const domain = `https://api.valantis.store:41000/`

const setCurrentMSKUTC = () => {
    const currentDate = new Date()
    const res = `${currentDate.getUTCFullYear()}${currentDate.getUTCMonth() + 1 < 10 ? `0${currentDate.getUTCMonth() +1}` : currentDate.getUTCMonth() + 1}${currentDate.getUTCDate() < 10 ? `0${currentDate.getUTCDate()}` : `${currentDate.getUTCDate()}`}`
    console.log(res)
    return res
}
// export const password = `Valantis_${dayjs(new Date()).format('YYYYMMDD')}`

export const password = `Valantis_${setCurrentMSKUTC()}`
export const routes = {
    domain: domain,
    actions: {
        get_ids: `get_ids`, //return sorted list of id`s products

        get_items: `get_items`, //list of products with all data (params need id param) max: 100 items

        get_fields: `get_fields`,

        filter: `filter`,
    },
    params: {
        offset: `offset`, //смещение относительно начала списка (подойдет для get_fields)
        limit: `limit`, //number of returned notes (подойдет для get_fields)

        ids: `ids`,// for get_items action

        field: `field`,//get_fields
    }
}
