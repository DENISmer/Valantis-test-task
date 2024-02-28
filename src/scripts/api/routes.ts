const domain = `https://api.valantis.store:41000/`
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
