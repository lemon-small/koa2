import Request from '../models/Request.js';
class IndexController {
    constructor () {
    }
    async actionIndex(ctx, next) {
        // async(ctx, next) => {
            // const bookData = await axios.get('http://192.168.64.2/basic/web/index.php?r=book%2Findex',{
            //     params:{
            //     }
            // }).then(function(response){
            //     // console.info(response);
            //     // console.info(response.data);
            //     return response.data;
            // }).catch(function(error){
            //     console.info(error);
            // });
            
            // console.log(ctxy); // 这里报错会进入errorHandler的catch中被log记录

            // 生产屏蔽以下4句，模拟mock数据
            // const request = new Request("book/index");
            // const reqData = {};
            // const bookData = await request.fetch(reqData);
            // console.log(bookData);
            ctx.body = await ctx.render('index.html', {
                // list: bookData,
                // list: [{bood_id: 1, book_name: 'asd'}],
                list: [
                    {
                        "book_id": "111",
                        "book_name": "aasssss",
                        "author": "aa",
                        "publisher": "aaa",
                        "publish_date": "2000-11-12",
                        "price": "11.00",
                        "sum": "1"
                    },
                    {
                        "book_id": "1233",
                        "book_name": "三国演义",
                        "author": "罗贯中",
                        "publisher": "中国人民出版社",
                        "publish_date": "1980-01-03",
                        "price": "100.00",
                        "sum": "12"
                    },
                    {
                        "book_id": "124",
                        "book_name": "西游记",
                        "author": "吴承恩",
                        "publisher": "清华大学出版社",
                        "publish_date": "1970-06-12",
                        "price": "123.00",
                        "sum": "2"
                    }
                ],
                title: 'my Books'
            });
        // }
    }
    async actionView (ctx, next) {
        // async(ctx, next) => {
            const bookData = await axios.get('http://192.168.64.2/basic/web/index.php?r=book%2Fview',{
                params:{
                    id: ctx.params.id
                }
            }).then(function(response){
                debugger;
                return response.data;
            }).catch(function(error){
                debugger;
                console.info(error);
            });
    
            ctx.body = await ctx.render('view.html', {
                id: ctx.params.id,
                bookData: bookData,
                title: 'my view'
            });
        // }
    }
    async actionUpdate (ctx, next) {
        // async(ctx, next) => {
            const bookData = await axios.get('http://192.168.64.2/basic/web/index.php?r=book%2Fview',{
                params:{
                    id: ctx.params.id
                }
            }).then(function(response){
                debugger;
                return response.data;
            }).catch(function(error){
                debugger;
                console.info(error);
            });

            ctx.body = await ctx.render('update.html', {
                bookData: bookData,
                title: 'my update'
            });
        // }
    }
    async actionHome (ctx, next) {
        // async(ctx, next) => {
            const list = [
                {
                    name: 'liu',
                    age: 22
                },
                {
                    name: 'huang',
                    age: 25
                },
                {
                    name: 'zhang',
                    age: 27
                }
            ];
            ctx.body = await ctx.render('tpl', {
                title: 'koa实战',
                list
            });
        // }
    }
}
export default IndexController;