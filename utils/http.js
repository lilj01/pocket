import {
    urlConfig
} from "../config/config"
import {
    promisic
} from "./util"

/*Http类 */
class Http {

    /*封装wx.request */
    static async request({
        url,
        data,
        method = 'GET'
    }) {
        const res = await promisic(wx.request)({
            url: `${urlConfig.apiBaseUrl}${url}`,
            data,
            method
        })
        return res.data
    }
}
export {
    Http
}