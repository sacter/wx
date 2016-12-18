Page({
  data:{
    id1:"back",
    id2:"clear",
    id3:"negative",
    id4:"+",
    id5:"9",
    id6:"8",
    id7:"7",
    id8:"-",
    id9:"6",
    id10:"5",
    id11:"4",
    id12:"×",
    id13:"3",
    id14:"2",
    id15:"1",
    id16:"÷",
    id17:"0",
    id18:".",
    id19:"history",
    id20:"=",
    screenData:"0",
    lastTsOperator:false,
    arr:[],
    logs:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  history:function(){ //跳转到历史页面
    wx.navigateTo({
      url: '../list/list',
    })
  },
  clickBtn:function(event){
    var id=event.target.id;
    var data=this.data.screenData;
    if(id==this.data.id1){//退格
       if(data==0){
         return;
       }
       data=data.substring(0,data.length-1);//重新为data赋值，取值的范围就由下标决定，第二个参数是随着点击而减小的
       if(data==""||data=="-"){
         data=0;
       }
       this.setData({screenData:data});
       this.data.arr.pop();
    }else if(id==this.data.id2){//清屏
       this.setData({screenData:0});
       this.data.arr.length=0;
    }else if(id==this.data.id3){//正负号
       if(data==0){
         return;
       }
       var firstWord=data.substring(0,1);
       if(firstWord=="-"){
         data=data.substring(1,data.length);
         this.data.arr.shift();
       }else{
         data="-"+data;
         this.data.arr.unshift("-");
       }
        this.setData({screenData:data});
    }else if(id==this.data.id20){
       if(data==0){
         return;
       }
       var lastWord=data.substring(data.length-1,data.length);
       if(isNaN(lastWord)){
         return;
       }
       var num="";
       var lastOperator;
       var arr=this.data.arr;
       var optarr=[];
       for(var i in arr){
         if(isNaN(arr[i])==false||arr[i]==this.data.id18||arr[i]==this.data.id3){
           num+=arr[i];
         }else{
           lastOperator=arr[i];
           optarr.push(num);
           optarr.push(arr[i]);
           num="";
         }
       }  
       optarr.push(Number(num));
       var result=Number(optarr[0])*1.0;
       for(var i=1;i<optarr.length;i++){
         if(isNaN(optarr[i])){
           if(optarr[1]==this.data.id4){
             result+=Number(optarr[i+1]);
           }else if(optarr[1]==this.data.id8){
             result-=Number(optarr[i+1]);
           }else if(optarr[1]==this.data.id12){
             result*=Number(optarr[i+1]);
           }else if(optarr[1]==this.data.id16){
             result/=Number(optarr[i+1]);
           }
         }
       }
       this.data.logs.push(data+"="+result);
       wx.setStorageSync('calllogs',this.data.logs); 
       console.log(wx.getStorageSync('calllogs'));
       this.data.arr.length=0;
       this.data.arr.push(result);
       this.setData({screenData:result+""});
    }else{
       if(id==this.data.id4||id==this.data.id8||id==this.data.id12||id==this.data.id16){
            if(this.data.lastTsOperator==true||this.data.screenData==0){
              return;
            }
       }
       var sd=this.data.screenData;
       var data;
       if(sd==0){
          data=id;
      }else{
          data=sd+id;
      }
          this.setData({screenData:data});
          this.data.arr.push(id);
          if(id==this.data.id4||id==this.data.id8||id==this.data.id12||id==this.data.id16){
            this.setData({lastTsOperator:true});
          }else{
            this.setData({lastTsOperator:false});
          }
    }
  }
})
