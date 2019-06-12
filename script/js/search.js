var search = document.querySelector('#search .search_bar .search_input');
var oUl = document.querySelector('#search .search_bar .search_data');

function search_sug(data) {
    console.log(data)
    arr = data.response.docs
    var str = ""
    for (var i = 0; i < arr.length; i++) {
        // console.log(arr[i].word)
        str = str + `<li><a href="https://search.zhe800.com/search?keyword=${arr[i].word}" target="_block"> ${arr[i].word}<span>约<em>${arr[i].count}</em>条结果</span></a></li >`
    }
    oUl.style.display = 'block'
    oUl.innerHTML = str
}

search.oninput = function() {
    oscript = document.createElement('script')
    oscript.src = 'https://status.tuanimg.com/zhe800-search/suggestion/searchJsonp?callback=search_sug&word=' + search.value + '&limit=10&offset=0&userSex=0&callback=search_sug'
    document.body.appendChild(oscript)
}

/* 获取搜索框索搜数据 */

// class Searchdata {
//     constructor() {
//         this.search = $('#search .search_bar .search_input');
//         this.search_data = $('#search .search_bar .search_data');
//     }
//     init() {
//         let _this = this;
//         this.search.focus(function() {
//             _this.show()
//         });
//         this.search.blur(function() {
//             setTimeout(() => {
//                 _this.hide()
//             }, 200);
//         });
//     }
//     show() {
//         this.search_data.show();
//     };
//     hide() {
//         this.search_data.hide()
//     }
// }
// new Searchdata().init()

/* 头部search框获得焦点search_data出现  失去焦点消失 */