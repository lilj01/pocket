/*将小程序的返回改为Promice形式  代理模式 */
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            })
            func(args)
        })
    }
}

export { promisic }