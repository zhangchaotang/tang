(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a593fbc"],{"12ba":function(t,e,n){"use strict";var a=n("8997"),i=n.n(a);i.a},8997:function(t,e,n){},e595:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"topn"},[n("van-tabs",{on:{change:t.tabChange}},t._l(t.titleList,(function(t){return n("van-tab",{key:t.id,attrs:{title:t.cat_name,name:t.id}})})),1),n("van-row",[n("table",{staticClass:"table"},[n("tr",{staticClass:"head"},[n("th",[t._v("排名")]),n("th",[t._v("姓名")]),n("th",[t._v("积分")])]),t._l(t.ton,(function(e,a){return n("tr",{key:a},[n("td",[t._v(t._s(a+1))]),n("td",[t._v(t._s(e.username))]),n("td",[t._v(t._s(e.integral))])])}))],2)])],1)},i=[],r=(n("96cf"),n("89ba")),s={data:function(){return{titleList:[],cat_id:"0",ton:[]}},methods:{getTitleList:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("/categories");case 2:e=t.sent,n=e.data,this.titleList=n.data;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),getTopn:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("/questions/topn?cat_id=".concat(this.cat_id));case 2:e=t.sent,n=e.data,this.ton=n.data;case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),tabChange:function(t){this.cat_id=t,this.getTopn()}},created:function(){this.getTitleList(),this.getTopn()}},c=s,u=(n("12ba"),n("2877")),o=Object(u["a"])(c,a,i,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-7a593fbc.6c6eeb15.js.map