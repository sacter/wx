Page({
  data:{
    city:"",
    today:"",
    future:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadInfo();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadInfo:function(){
    var page=this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
         var latitude = res.latitude   //经度
         var longitude = res.longitude//纬度
         page.loadCity(latitude,longitude);
      }
    })
  },
  loadCity:function(latitude,longitude){
    var page=this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=Xm6emIL5406A5GkNdDbD20psSrLwweO0&location='+latitude+','+longitude+'&output=json', //通过ak、经纬度找到对应信息
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var where=res.data.result.addressComponent.city;
        page.setData({city:where});
        where=where.replace("市","");
        page.loadWeather(where);
      }
    })
  },
  loadWeather:function(city){
    var page=this;
    wx.request({
      url:'http://wthrcdn.etouch.cn/weather_mini?city='+city+'',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var future=res.data.data.forecast;
        var todayInfo=future.shift();  //使用shift()方法将数组future的第一个数据移除掉，并且返回给todayInfo
        var today=res.data.data;
        today.todayInfo=todayInfo; //将todayInfo作为today的todayInfo属性添加到today里面
        city=city+"市";
        page.setData({today:today,future:future,city:city})
      }
    })
  }
})