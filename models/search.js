import {
    Paging
} from "../utils/Paging"

class Search{
    static search(q){
        return new Paging({
            url:`search?q=${q}`
        })
    }
}

export {
    Search
}