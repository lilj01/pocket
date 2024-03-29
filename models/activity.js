const {
    Http
} = require("../utils/http");

/**活动 */
class Activity {

    static locationD = 'a-2'

    /**获取优惠卷入口信息 */
    static async getLocationD() {
        return await Http.request({
            url: `activity/name/${Activity.locationD}`
        })
    }

    static async getActivityWithCoupon(activityName) {
        return Http.request({
            url: `activity/name/${activityName}/with_coupon`
        })
    }

}

export {
    Activity
}