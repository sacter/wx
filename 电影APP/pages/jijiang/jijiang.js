Page({
  data:{
    movies:[],
    hidden:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadMovie();
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
  processSubject:function(subject){
      var title=subject.title;  //名字
      var year=subject.year; //发行年份
      var rating=subject.rating.average //豆瓣评分
      var directors=subject.directors;  //导演
      var directorStr="";
      for(var j in directors){
          directorStr=directorStr+directors[j].name+" /";
      }
      if(directorStr!=""){
          directorStr=directorStr.substring(0,directorStr.length-2); //directorStr.length要-2是应为前面加了一个空格和/
      }
      var casts=subject.casts;  //演员
      var castStr="";
      for(var j in casts){
          castStr=castStr+casts[j].name+" /";
      }
      if(castStr!=""){
          castStr=castStr.substring(0,castStr.length-2);
      }
      var genres=subject.genres;  //类型
      var genreStr="";
      for(var j in genres){
          genreStr=genreStr+genres[j]+" /";
      }
      if(genreStr!=""){
          genreStr=genreStr.substring(0,genreStr.length-2);
      }
      var text="名称："+title+"\n导演："+directorStr+"\n主演："+castStr+"\n类型："+genreStr+"\n上映年份："+year+"(中国大陆)"+"\n豆瓣评分："+rating;
      subject.text=text;
  },
  processSubjects:function(subjects){
      for(var i=0;i<subjects.length;i++){
          var subject=subjects[i];
          this.processSubject(subject);
      }
  },
  loadMovie:function(){
      var page=this;
      wx.request({ 
          url: 'https://api.douban.com/v2/movie/coming_soon',  //豆瓣即将上映的API
        header: {
          "Content-Type":"json"
        },
        success: function(res) {          
           var subjects=res.data.subjects;
           page.processSubjects(subjects);
           page.setData({movies:subjects,hidden:true});
        }
      })
   },
   detail:function(e){
      //wx.setStorageSync('movieId',e.currentTarget.id);  //通过本地存储保留当前id
      wx.navigateTo({
        url: '../detail/detail?id='+e.currentTarget.id  //通过页面初始化 options参数保留当前id
     })
   }
})