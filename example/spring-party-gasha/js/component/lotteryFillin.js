"use strict";Vue.component("lottery-fillin",{template:"#lotteryFillin",data:function(){return{type:"",mobile:"",userid:"",awardPaper:[{awardName:"現金 NT.99,999",path:"images/《能量不斷電終極大獎 現金99,999》中獎回覆函.doc"},{awardName:"Nintendo Switch",path:"images/《補充能量獎週週抽 Nintendo Switch》中獎回覆函.doc"},{awardName:"SONY PS4",path:"images/《百大鐵人排名獎 SONY PS4》中獎回覆函.doc"}],paper:null,fblogin:!1,fbData:{fbToken:"",fbId:"",fbName:"",fbPic:""},invNumber:"",awardItem:"",name:"",address:"",IdcardFront:null,IdcardBack:null,Bankbook:null,CertificatePhoto:null,agree:!1,imageShow:{IdcardFront:null,IdcardBack:null,Bankbook:null,CertificatePhoto:null}}},watch:{IdcardFront:function(){""==!this.IdcardFrontShow&&(document.querySelector("#frontpre p").style.display="none",document.querySelector("#frontpre img").style.opacity="1")},IdcardBack:function(){""==!this.IdcardBackShow&&(document.querySelector("#backpre p").style.display="none",document.querySelector("#backpre img").style.opacity="1")},Bankbook:function(){""==!this.BankbookShow&&(document.querySelector("#bankpre p").style.display="none",document.querySelector("#bankpre img").style.opacity="1")},CertificatePhotoShow:function(){""==!this.CertificatePhotoShow&&(document.querySelector("#certificatepre p").style.display="none",document.querySelector("#certificatepre img").style.opacity="1")}},methods:{readpoto:function(e){var t=this,a=e.target.files.item(0),n=e.target.id,i=new FileReader;i.addEventListener("load",function(e){"front"==n&&(t.imageShow.IdcardFront=e.target.result,t.IdcardFront=a);"back"==n&&(t.imageShow.IdcardBack=e.target.result,t.IdcardBack=a);"bank"==n&&(t.imageShow.Bankbook=e.target.result,t.Bankbook=a);"certificate"==n&&(t.imageShow.CertificatePhoto=e.target.result,t.CertificatePhoto=a)}),i.readAsDataURL(a)},postback:function(){var t=this;if(!t.loading){if(t.loading=!0,!t.name)return alert("請填入收件人"),void(t.loading=!1);if(!t.address)return alert("請填入地址"),void(t.loading=!1);if("FB"==t.type){if(!t.fbData.fbId)return alert("請先登入FB"),void(t.loading=!1)}else if("Invoice"==t.type&&!t.CertificatePhoto)return alert("請上傳發票正本電子檔"),void(t.loading=!1);if(!t.agree)return alert("請勾選我已詳閱"),void(t.loading=!1);t.grecaptcha("backfill").then(function(){t.postRecipientinfo().then(function(e){e.success?alert("資料已送出，感謝您的參與！"):alert("您並無資格領取此獎項。"),window.location.href="./index.html",t.loading=!1})})}},postRecipientinfo:function(){var t=this;postInfo({name:t.name},"apiName").then(function(e){e.success?alert("資料已送出，感謝您的參與！"):alert("您並無資格領取此獎項。"),window.location.href="./index.html",t.loading=!1})},fbLogin:function(){var t=this;FB.login(function(e){"connected"===e.status&&(t.fbData.fbToken=e.authResponse.accessToken,t.fbData.fbId=e.authResponse.userID,FB.api("/me","GET",{fields:"id,name,picture"},function(e){t.fbData.fbName=e.name,t.fbData.fbPic="http://graph.facebook.com/"+e.id+"/picture?width=140&height=140",t.fblogin=!0}))})},getRecipientinfo:function(){var a=this;return new Promise(function(t){getInfo("","apiName"+a.userid).then(function(e){e.success?(a.mobile=e.data.mobile,a.invNumber=e.data.referenceInfo,a.awardItem=e.data.awardName,a.type=e.data.referenceType,t()):(alert("資料已回填或無法查獲此獎項"),window.location.href="./index.html")})})},checkPaper:function(){var t=this;t.awardPaper.forEach(function(e){if(t.awardItem==e.awardName)return t.paper=e})}},mounted:function(){var e=this;loadpage("init"),e.userid=findGetParameter("user"),e.getRecipientinfo().then(function(){e.checkPaper()})}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC9sb3R0ZXJ5RmlsbGluLmpzIl0sIm5hbWVzIjpbIlZ1ZSIsImNvbXBvbmVudCIsInRlbXBsYXRlIiwidHlwZSIsIm1vYmlsZSIsInVzZXJpZCIsImF3YXJkUGFwZXIiLCJhd2FyZE5hbWUiLCJwYXRoIiwicGFwZXIiLCJmYmxvZ2luIiwiZmJUb2tlbiIsImZiSWQiLCJmYk5hbWUiLCJmYlBpYyIsImludk51bWJlciIsImF3YXJkSXRlbSIsImFkZHJlc3MiLCJJZGNhcmRGcm9udCIsIkJhbmtib29rIiwiSWRjYXJkQmFjayIsImFncmVlIiwiQ2VydGlmaWNhdGVQaG90byIsIndhdGNoIiwidGhpcyIsIklkY2FyZEZyb250U2hvdyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiZGlzcGxheSIsIm9wYWNpdHkiLCJJZGNhcmRCYWNrU2hvdyIsIkJhbmtib29rU2hvdyIsIkNlcnRpZmljYXRlUGhvdG9TaG93IiwibWV0aG9kcyIsInJlYWRwb3RvIiwidm0iLCJmaWxlIiwiZSIsInRhcmdldCIsImZpbGVzIiwiaXRlbSIsImlkIiwicmVhZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltYWdlU2hvdyIsInJlc3VsdCIsIkZpbGVSZWFkZXIiLCJpbWdMb2FkIiwicmVhZEFzRGF0YVVSTCIsInBvc3RiYWNrIiwibG9hZGluZyIsImFsZXJ0IiwiZmJEYXRhIiwiZ3JlY2FwdGNoYSIsInRoZW4iLCJwb3N0UmVjaXBpZW50aW5mbyIsInJlcyIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJwb3N0SW5mbyIsIm5hbWUiLCJmYkxvZ2luIiwic3RhdHVzIiwiYXV0aFJlc3BvbnNlIiwiYWNjZXNzVG9rZW4iLCJ1c2VySUQiLCJhcGkiLCJmaWVsZHMiLCJhcGlyZXMiLCJnZXRSZWNpcGllbnRpbmZvIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnZXRJbmZvIiwiZGF0YSIsInJlZmVyZW5jZUluZm8iLCJyZWZlcmVuY2VU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M0MsRUFBQVosS0FsQkxZLEVBQUE5QixXQUFBMEUsUUFBQSxTQUFBdkMsR0EvR0MsR0FBQUwsRUFBQXBCLFdBQUF5QixFQUFBbEMsVUFvSVcsT0FBRTZCLEVBQUEzQixNQUFBZ0MsTUFNRlcsUUFBQUEsV0FDQU8sSUFBQUEsRUFBQUEsS0FFQXZCLFNBQUdoQyxRQUNIZ0MsRUFBQUEsT0FBR3JCLGlCQUFxQjhELFFBQ3hCekMsRUFBQUEsbUJBQWtCbUIsS0FBSCxXQUNmbkIsRUFBR2pDIiwiZmlsZSI6ImNvbXBvbmVudC9sb3R0ZXJ5RmlsbGluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiVnVlLmNvbXBvbmVudCgnbG90dGVyeS1maWxsaW4nLCB7XHJcbiAgICB0ZW1wbGF0ZTogXCIjbG90dGVyeUZpbGxpblwiLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiXCIsIC8vIEludm9pY2VcIiBvciBGQlxyXG4gICAgICAgICAgICBtb2JpbGU6IFwiXCIsXHJcbiAgICAgICAgICAgIHVzZXJpZDogXCJcIixcclxuICAgICAgICAgICAgYXdhcmRQYXBlcjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYXdhcmROYW1lXCI6IFwi54++6YeRIE5ULjk5LDk5OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcImltYWdlcy/jgIrog73ph4/kuI3mlrfpm7vntYLmpbXlpKfnjY4g54++6YeROTksOTk544CL5Lit542O5Zue6KaG5Ye9LmRvY1wiXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhd2FyZE5hbWVcIjogXCJOaW50ZW5kbyBTd2l0Y2hcIixcclxuICAgICAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJpbWFnZXMv44CK6KOc5YWF6IO96YeP542O6YCx6YCx5oq9IE5pbnRlbmRvIFN3aXRjaOOAi+S4reeNjuWbnuimhuWHvS5kb2NcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYXdhcmROYW1lXCI6IFwiU09OWSBQUzRcIixcclxuICAgICAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJpbWFnZXMv44CK55m+5aSn6ZC15Lq65o6S5ZCN542OIFNPTlkgUFM044CL5Lit542O5Zue6KaG5Ye9LmRvY1wiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBwYXBlcjogbnVsbCxcclxuICAgICAgICAgICAgZmJsb2dpbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGZiRGF0YToge1xyXG4gICAgICAgICAgICAgICAgZmJUb2tlbjogXCJcIixcclxuICAgICAgICAgICAgICAgIGZiSWQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBmYk5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBmYlBpYzogXCJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW52TnVtYmVyOiBcIlwiLFxyXG4gICAgICAgICAgICBhd2FyZEl0ZW06IFwiXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIElkY2FyZEZyb250OiBudWxsLCAvL+ato+mdolxyXG4gICAgICAgICAgICBJZGNhcmRCYWNrOiBudWxsLCAvL+WPjemdolxyXG4gICAgICAgICAgICBCYW5rYm9vazogbnVsbCwgLy/lrZjmkbpcclxuICAgICAgICAgICAgQ2VydGlmaWNhdGVQaG90bzogbnVsbCwgLy/nmbznpahcclxuICAgICAgICAgICAgYWdyZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbWFnZVNob3c6IHtcclxuICAgICAgICAgICAgICAgIFwiSWRjYXJkRnJvbnRcIjogbnVsbCxcclxuICAgICAgICAgICAgICAgIFwiSWRjYXJkQmFja1wiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJCYW5rYm9va1wiOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJDZXJ0aWZpY2F0ZVBob3RvXCI6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICBJZGNhcmRGcm9udDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXZtLklkY2FyZEZyb250U2hvdyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAkKFwiI2Zyb250cHJlIHBcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAkKFwiI2Zyb250cHJlIGltZ1wiKS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmcm9udHByZSBwJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmcm9udHByZSBpbWcnKS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBJZGNhcmRCYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdm0uSWRjYXJkQmFja1Nob3cgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gJChcIiNiYWNrcHJlIHBcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAkKFwiI2JhY2twcmUgaW1nXCIpLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JhY2twcmUgcCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFja3ByZSBpbWcnKS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBCYW5rYm9vazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXZtLkJhbmtib29rU2hvdyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAkKFwiI2JhbmtwcmUgcFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICQoXCIjYmFua3ByZSBpbWdcIikuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFua3ByZSBwJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYW5rcHJlIGltZycpLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIENlcnRpZmljYXRlUGhvdG9TaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdm0uQ2VydGlmaWNhdGVQaG90b1Nob3cgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gJChcIiNjZXJ0aWZpY2F0ZXByZSBwXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gJChcIiNjZXJ0aWZpY2F0ZXByZSBpbWdcIikuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2VydGlmaWNhdGVwcmUgcCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2VydGlmaWNhdGVwcmUgaW1nJykuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHJlYWRwb3RvKGUpIHsgLy9pbnB1dCBmaWxlIG9uY2hhbmdlIGV2ZW50XHJcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXMuaXRlbSgwKTtcclxuICAgICAgICAgICAgdmFyIGlkID0gZS50YXJnZXQuaWQ7XHJcbiAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGltZ0xvYWQpO1xyXG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGltZ0xvYWQoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkID09IFwiZnJvbnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmltYWdlU2hvdy5JZGNhcmRGcm9udCA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB2bS5JZGNhcmRGcm9udCA9IGZpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT0gXCJiYWNrXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5pbWFnZVNob3cuSWRjYXJkQmFjayA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB2bS5JZGNhcmRCYWNrID0gZmlsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpZCA9PSBcImJhbmtcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmltYWdlU2hvdy5CYW5rYm9vayA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB2bS5CYW5rYm9vayA9IGZpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT0gXCJjZXJ0aWZpY2F0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uaW1hZ2VTaG93LkNlcnRpZmljYXRlUGhvdG8gPSBlLnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uQ2VydGlmaWNhdGVQaG90byA9IGZpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBvc3RiYWNrKCkge1xyXG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXZtLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2bS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLoq4vloavlhaXmlLbku7bkurpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmICghdm0uYWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6KuL5aGr5YWl5Zyw5Z2AXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZiAodm0udHlwZSA9PSBcIkZCXCIpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2bS5mYkRhdGEuZmJJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuiri+WFiOeZu+WFpUZCXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZtLnR5cGUgPT0gXCJJbnZvaWNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZtLkNlcnRpZmljYXRlUGhvdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLoq4vkuIrlgrPnmbznpajmraPmnKzpm7vlrZDmqpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZighdm0uSWRjYXJkRnJvbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgYWxlcnQoXCLoq4vkuIrlgrPouqvku73orYnmraPpnaLpm7vlrZDmqpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZighdm0uSWRjYXJkQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBhbGVydChcIuiri+S4iuWCs+i6q+S7veitieWPjemdoumbu+WtkOaqlFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKCF2bS5CYW5rYm9vaykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBhbGVydChcIuiri+S4iuWCs+WtmOaRuumbu+WtkOaqlFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF2bS5hZ3JlZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi6KuL5Yu+6YG45oiR5bey6Kmz6ZaxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyB2bS5nZXRUb2tlbigpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmdyZWNhcHRjaGEoXCJiYWNrZmlsbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ucG9zdFJlY2lwaWVudGluZm8oKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuaCqOS4pueEoeizh+agvOmgmOWPluatpOeNjumgheOAglwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuizh+aWmeW3sumAgeWHuu+8jOaEn+isneaCqOeahOWPg+iIh++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9zdFJlY2lwaWVudGluZm86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgICAgICAgICBwb3N0SW5mbyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiB2bS5uYW1lLFxyXG4gICAgICAgICAgICB9LCAnYXBpTmFtZScpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLmgqjkuKbnhKHos4fmoLzpoJjlj5bmraTnjY7poIXjgIJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vaW5kZXguaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLos4fmlpnlt7LpgIHlh7rvvIzmhJ/orJ3mgqjnmoTlj4PoiIfvvIFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vaW5kZXguaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZiTG9naW4oKSB7XHJcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgICAgIEZCLmxvZ2luKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmZiRGF0YS5mYlRva2VuID0gcmVzLmF1dGhSZXNwb25zZS5hY2Nlc3NUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB2bS5mYkRhdGEuZmJJZCA9IHJlcy5hdXRoUmVzcG9uc2UudXNlcklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDlj5blvpdmYuWAi+S6uuizh+aWmVxyXG4gICAgICAgICAgICAgICAgICAgIEZCLmFwaSgnL21lJywgJ0dFVCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmllbGRzXCI6IFwiaWQsbmFtZSxwaWN0dXJlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGFwaXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYXBpcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmZiRGF0YS5mYk5hbWUgPSBhcGlyZXMubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZtLmZiRGF0YS5mYlBpYyA9IGFwaXJlcy5waWN0dXJlLmRhdGEudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZmJEYXRhLmZiUGljID0gJ2h0dHA6Ly9ncmFwaC5mYWNlYm9vay5jb20vJyArIGFwaXJlcy5pZCArICcvcGljdHVyZT93aWR0aD0xNDAmaGVpZ2h0PTE0MCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5mYmxvZ2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRSZWNpcGllbnRpbmZvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtcclxuICAgICAgICAgICAgICAgIGdldEluZm8oJycsJ2FwaU5hbWUnK3ZtLnVzZXJpZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuizh+aWmeW3suWbnuWhq+aIlueEoeazleafpeeNsuatpOeNjumghVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vaW5kZXguaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLm1vYmlsZSA9IHJlcy5kYXRhLm1vYmlsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uaW52TnVtYmVyID0gcmVzLmRhdGEucmVmZXJlbmNlSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYXdhcmRJdGVtID0gcmVzLmRhdGEuYXdhcmROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS50eXBlID0gcmVzLmRhdGEucmVmZXJlbmNlVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrUGFwZXI6IGZ1bmN0aW9uICgpIHsgXHJcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZtLmF3YXJkUGFwZXIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyBcclxuICAgICAgICAgICAgICAgIGlmICh2bS5hd2FyZEl0ZW0gPT0gaXRlbS5hd2FyZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm0ucGFwZXIgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3VudGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgICAgICAvLyB2bS5yZWFkcGljKCk7XHJcbiAgICAgICAgbG9hZHBhZ2UoJ2luaXQnKTtcclxuICAgICAgICB2bS51c2VyaWQgPSBmaW5kR2V0UGFyYW1ldGVyKCd1c2VyJyk7XHJcbiAgICAgICAgdm0uZ2V0UmVjaXBpZW50aW5mbygpLnRoZW4oZnVuY3Rpb24gKCkgeyBcclxuICAgICAgICAgICAgdm0uY2hlY2tQYXBlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiXX0=