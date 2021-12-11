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

/**排列组合 --->组合   返回二维数组 如下：*/
// 0: (2)["1-45", "3-9"]
// 1: (2)["1-45", "4-14"]
// 2: (2)["3-9", "4-14"]
const combination = function (arr, size) {
    var r = []

    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t
            return
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice()
            b.push(a[i])
            _(b, a.slice(i + 1), n - 1)
        }
    }
    _([], arr, size)
    return r
}

export {
    promisic,
    combination
}