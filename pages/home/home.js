Page({

    data: {},

    onLoad: function() {
        wx.request({
            url: 'http://localhost:8081/v1/theme/by/names',
            data: {
                names:'t-1'
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                console.log(res)
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
})