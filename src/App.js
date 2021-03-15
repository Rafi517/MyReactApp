import React from 'react';
import './App.css';
import title_left_2 from './static/images/title_left_2.png';
import title_left_1 from './static/images/title_left_1.png';
import title_right_2 from './static/images/title_right_2.png';
import title_right_1 from './static/images/title_right_1.png';
import title_right_3 from './static/images/title_right_3.png';
import title_left_3 from './static/images/title_left_3.png';
import title_center from './static/images/title_center.png';
import IMG01 from './static/images/01.jpg';
import IMG02 from './static/images/02.jpg';
import IMG03 from './static/images/03.jpg';
import IMG04 from './static/images/04.jpg';
import IMG05 from './static/images/05.jpg';
import IMG06 from './static/images/06.jpg';
import IMG07 from './static/images/07.jpg';
import IMG08 from './static/images/08.jpg';
import IMG09 from './static/images/09.jpg';
import IMG10 from './static/images/10.jpg';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

let box;
let con1;
let con2;
let speed;
var j=0;

var str="1.寻找可发货服务点：上海仓、上海门店、北京仓、北京门店、广州仓、杭州仓、武汉仓、西安门店点         " +
    "|2.商品优先仓库发货原则： 上海仓、北京仓、广州仓        " +
    "|3.库存深度判断：上海仓、广州仓        " +
    "|4.就近原则：上海仓      " +
    "|5";

class App extends React.Component {
    id;
    i;
    state = {
        productData: [
            {id: 1, image: IMG01, name: '李锦记 千岛风味沙拉汁 220g', price: '￥19.9', quantity: '126'},
            {id: 2, image: IMG02, name: '李锦记 香蒜辣椒酱 360g', price: '￥15', quantity: '91'},
            {id: 3, image: IMG03, name: '青岛啤酒 经典10度 500ml', price: '￥5.5', quantity: '86'},
            {id: 4, image: IMG04, name: '青岛啤酒 奥古特12度 500ml', price: '￥8.5', quantity: '56'},
            {id: 5, image: IMG05, name: '青岛啤酒 枣味黑啤12度 296ml', price: '￥9.5', quantity: '54'},
            {id: 6, image: IMG06, name: '光明 莫斯利安 酸奶（原味） 200g', price: '￥6.5', quantity: '51'},
            {id: 7, image: IMG07, name: '光明 莫斯利安 酸奶（原味） 350g', price: '￥10', quantity: '43'},
            {id: 8, image: IMG08, name: '光明 莫斯利安2果3蔬 绿果 135g', price: '￥5', quantity: '22'},
            {id: 9, image: IMG09, name: '光明 纯牛奶 优+ 200ml', price: '￥6.5', quantity: '21'},
            {id: 10, image: IMG10, name: '莫斯利安 酸奶 玫瑰花风味 200g', price: '￥6.5', quantity: '18'},
        ]
    }

    componentDidMount() {
        let map = this.map && this.map.getEchartsInstance();
        map.showLoading();

        import('./static/js/china.json').then(chinaJson=>{
            map.hideLoading();
            echarts.registerMap('china', chinaJson.default);
        });

        box = this.con;
        con1 = this.con1;
        con2 = this.con2;
        speed = 50;

        this.i = setInterval(this.scroll, speed);
        this.id = setInterval(this.typing, 100);

    }
    typing(){
        if(j < str.length){
            var mydiv=document.getElementById("text");
            var char = str.charAt(j);
            // console.log(mydiv.innerHTML)
            if(char === '|'){
                mydiv.innerHTML+="<br />";
            }else if(char === '5'){
                const div = document.createElement('div');
                div.setAttribute("class", "printItem");
                div.innerHTML = "寻源到发货服务点：上海仓";
                mydiv.appendChild(div);
            }else{
                mydiv.innerHTML+=char;
            }
            j++;
        }

        if(j === str.length){
            clearInterval(this.id);
            setTimeout(()=>{
                if(char === '5'){
                    document.getElementById("text").innerHTML = "";
                    j = 0;

                    this.id = setInterval(this.typing, 100);
                }
            }, 10 * 1000);
        }
    }

    scroll () {
        console.log(box.scrollTop, con1.scrollHeight)
        if (box.scrollTop + 562 >= con1.scrollHeight) {
            con2.innerHTML = con1.innerHTML;
            box.scrollTop = 0;
            con2.innerHTML = '';
        } else {
            box.scrollTop++
        }
    }


    // componentWillUnmount() {
    //     // window.removeEventListener('resize',null)
    // }

    componentWillUnmount() {
        if (undefined !== this.myTimer) {
            clearInterval(this.myTimer);
        }
        clearInterval(this.i);
        clearInterval(this.id);
    }

    getOption(type) {
        const option1 = {
            tooltip: {},
            grid: {
                top: 20,
            },
            dataset: {
                source: [
                    ['product', '商品加购量', '商品浏览量'],
                    ['食品酒水', 100, 230],
                    ['定制专区', 200, 260],
                    ['家纺家居', 120, 50],
                    ['电器设备', 150, 60],
                ]
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#60a3c2',
                }
            },
            yAxis: {
                splitLine: {show: false},
                axisLabel: {
                    color: '#60a3c2',
                },
                max: 300,
                splitNumber: 4
            },
            series: [
                {type: 'bar', barWidth: '20%'},
                {type: 'bar', barWidth: '20%'}
            ],
            color: ['#29c7ab', '#3398db'],
        }
        const option2 = {
            grid: {
                top: 10,
            },
            legend: {
                z: 100,
                top: 0,
                show: true,
                textStyle:{
                    color: '#fff',
                },
            },
            xAxis: {
                data: ['订单金额', '发货金额', '订单数', '配货单数', '发货单数'],
                axisTick: {show: false},
                // 文本
                axisLabel: {
                    color: '#fff',
                    fontSize: 14,
                },
                // 轴线
                axisLine: {
                    show: false,
                    color: 'rgba(194, 221, 248, 1)',
                },
            },
            yAxis: {
                show: false,
            },
            series: [{
                name: 'HMALL',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#29c7ab'
                    }
                },
                silent: true,
                barWidth: 40,
                barGap: '-100%', // Make series be overlap
                data: [160, 80, 66, 100, 99]
            }, {
                name: '小程序',
                type: 'bar',
                barWidth: 40,
                itemStyle: {
                    normal: {
                        color: '#e49b1d'
                    }
                },
                z: 10,
                data: [40, 41, 45, 32, 80]
            }, {
                name: '门店大屏',
                type: 'bar',
                barWidth: 40,
                itemStyle: {
                    normal: {
                        color: '#2e34eb'
                    }
                },
                z: 11,
                data: [21, 4, 5, 5, 12]
            }]
        }
        const option3 = {
            grid: {
                top: 10,
            },
            xAxis: {
                show: false,
            },
            yAxis: {
                type: 'category',
                data: ['海南省','湖北省','北京','上海'],
                nameTextStyle: {
                    color: 'rgba(194, 221, 248, 1)',
                    fontSize: 14,
                },
                // 坐标轴刻度
                axisTick: {
                    show: false,
                },
                // 轴线
                axisLine: {
                    show: false,
                },
                // 文本
                axisLabel: {
                    color: 'rgba(194, 221, 248, 1)',
                    fontSize: 14,
                },
                // 背景分割线
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(63, 163, 191, 0.49)',
                        type: 'dashed',
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    data: [1, 2, 5, 10],
                    barCategoryGap: '50%',
                    barGap: '150px',
                    // 填充面积（渐变色）
                    itemStyle: {
                        color:  new echarts.graphic.LinearGradient(
                            1, 0, 0, 0,
                            [
                                { offset: 0, color: "#00fdd0" },
                                { offset: 1, color: '#2e34eb' }
                            ]
                        )
                    }
                },
            ]
        }
        const option4 = {
            title: {
                text:'单数',
                left:'center',
                top:'middle',
                textStyle:{
                    color:'#fff',
                    fontSize:18,
                    align:'center'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                // orient: 'vertical',
                bottom: 0,
                textStyle: {color: '#fff'}
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['38%', '48%'],
                    label: {
                        position: 'outer',
                        alignTo: 'labelLine',
                        bleedMargin: 5,
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: '{d}%'
                    },
                    data: [
                        {value: 110, name: '门店自提', itemStyle: {color: '#3371fb'}},
                        {value: 590, name: '仓库发货', itemStyle: {color: '#efdd1e'}},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: '#fff'
                        }
                    }
                }
            ]
        };
        const option5 = {
            title: {
                text:'金额',
                left:'center',
                top:'middle',
                textStyle:{
                    color:'#fff',
                    fontSize:18,
                    align:'center'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                // orient: 'vertical',
                bottom: 0,
                textStyle: {color: '#fff'}
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['38%', '48%'],
                    label: {
                        position: 'outer',
                        alignTo: 'labelLine',
                        bleedMargin: 5,
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: '{d}%'
                    },
                    data: [
                        {value: 430, name: '门店自提', itemStyle: {color: '#3371fb'}},
                        {value: 780, name: '仓库发货', itemStyle: {color: '#efdd1e'}},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: '#fff'
                        }
                    }
                }
            ]
        };
        const option6 = {
            title: {
                text: '商品件数',
                left:'center',
                top:'middle',
                textStyle:{
                    color:'#fff',
                    fontSize:18,
                    align:'center'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                // orient: 'vertical',
                bottom: 0,
                textStyle: {color: '#fff'}
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['38%', '48%'],
                    label: {
                        position: 'outer',
                        alignTo: 'labelLine',
                        bleedMargin: 5,
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: '{d}%'
                    },
                    data: [
                        {value: 130, name: '门店自提', itemStyle: {color: '#3371fb'}},
                        {value: 730, name: '仓库发货', itemStyle: {color: '#efdd1e'}},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: '#fff'
                        }
                    }
                }
            ]
        };
        switch (type){
            case 'option1': return option1;
            case 'option2': return option2;
            case 'option3': return option3;
            case 'option4': return option4;
            case 'option5': return option5;
            case 'option6': return option6;
            default: return option1;
        }
    }

    getMap(){
        var geoCoordMap = {
            '上海': [121.4648, 31.2891],
            '四平门店': [124.361657,43.1802],
            '北京仓': [116.405338,39.914687],
            '西宁门店': [101.791345,36.613884],
            '西安门店': [108.941866,34.333677],
            '武汉仓': [114.273067,30.615624],
            '杭州仓': [120.17814,30.260818],
            '成都门店': [104.062971,30.589191],
            '拉萨门店': [91.150862,29.669781],
            '昆明仓': [102.850941,24.874996],
            '广州仓': [113.289826,23.130284],
        };

        var MapData = [
            [{
                name: '上海'
            }, {
                name: '四平门店',
                value: 90
            }],
            [{
                name: '上海'
            }, {
                name: '北京仓',
                value: 80
            }],
            [{
                name: '上海'
            }, {
                name: '西宁门店',
                value: 70
            }],
            [{
                name: '上海'
            }, {
                name: '西安门店',
                value: 60
            }],
            [{
                name: '上海'
            }, {
                name: '武汉仓',
                value: 50
            }],
            [{
                name: '上海'
            }, {
                name: '杭州仓',
                value: 40
            }],
            [{
                name: '上海'
            }, {
                name: '成都门店',
                value: 30
            }],
            [{
                name: '上海'
            }, {
                name: '拉萨门店',
                value: 20
            }],
            [{
                name: '上海'
            }, {
                name: '昆明仓',
                value: 10
            },
                {
                    name: '上海'
                }, {
                name: '广州仓',
                value: 10
            }]
        ];
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var toCoord = geoCoordMap[dataItem[0].name];
                var fromCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord
                    }, {
                        coord: toCoord
                    }]);
                }
            }
            return res;
        };

        var color = ['#FFD700'];
        var series = [];
        [['寻源', MapData],]
            .forEach(function(item, i) {
            series.push({
                name: 'start',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3.5
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0
                    }
                },
                data: convertData(item[1])
            }, {
                name: 'end',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: "circle",
                    color: '#fff',
                    symbolSize: 5
                },
                lineStyle: {
                    type: 'solid',
                    normal: {
                        color: color[i],
                        width: 2,
                        opacity: 0.4,
                        curveness: 0
                    }
                },
                data: convertData(item[1])
            }, {
                name: 'dot',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: 15,
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });

        const option = {
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                top: 0,
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#000000',
                        borderColor: "#3c4654",
                        borderWidth: 1.5
                    },
                    emphasis: {
                        areaColor: "#5c6677",
                    }
                }
            },
            series: series
        };

        return option;
    }

    productItems(){
        const {productData} = this.state;
        return productData.map((item, index)=>{
            return (
                <li key={index}>
                    <span className="store_clb_num">{index+1}</span>
                    <span className="store_clb_img">
                      <img alt="" src={item.image} className="img_zoom_square"/>
                    </span>
                    <div className="store_clb_box">
                        <span className="store_clb_label">{item.name}</span>
                        <span className="store_clb_price">{item.price}</span>
                    </div>
                    <span className="store_clb_amount">已售出：<span>{item.quantity}&nbsp;&nbsp;</span>件</span>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="storeContainer">
                <div className="storeContent">
                    <div className="store_content_left">
                        <div className="store_cl_top" style={{height: '38%'}}>
                            <span className="titles">
                                <img alt="" className="img_zoom" src={title_left_2} />
                            </span>
                            <ReactEcharts style={{width: '100%', height: '88%'}} option={this.getOption('option1')} />
                        </div>

                        <div className="store_cl_bottom" style={{height: '60%'}}>
                            <span className="titles">
                                <img alt="" className="img_zoom" src={title_left_1}/>
                            </span>
                            <div id='con' ref={(c) => { this.con = c }}>
                                <ul ref={(c) => { this.con1 = c }} id="con1">{this.productItems()}</ul>
                                <ul id='con2' ref={(c) => { this.con2 = c }}></ul>
                            </div>

                        </div>
                    </div>
                    <div className="store_content_center">
                        <div className="store_cc_top borderY">
                            <div style={{width: "300px", marginLeft: "50px", color: "#fff", marginTop: "6px", fontSize: "26px", fontWeight: "bold"}}>
                                <img src={title_center} className="img_zoom" alt="" />
                            </div>

                            <div className="storeMapDetail" id="storeMapDetailText">
                                <div id="text"></div>
                            </div>

                            <ReactEcharts style={{width: '100%', height: '100%'}} ref={(e) => { this.map = e; }} option={this.getMap()} />
                        </div>
                        <div className="store_cr_center borderY" style={{position: "absolute", paddingTop: '2%', left: "5%"}}>
                            <span className="titles" style={{textAlign: "left", marginBottom: 0}}>
                                <img src={title_left_3} alt="" />
                            </span>
                            <ul className="storeAn">
                                <ReactEcharts style={{width: '100%', height: '85%'}} option={this.getOption('option4')} />
                                <ReactEcharts style={{width: '100%', height: '85%'}} option={this.getOption('option5')} />
                                <ReactEcharts style={{width: '100%', height: '85%'}} option={this.getOption('option6')} />
                            </ul>
                        </div>
                    </div>
                    <div className="store_content_right">
                        <div className="store_cr_center borderY" style={{height: '32%'}}>
                    <span className="titles">
                        <img src={title_right_2} className="img_zoom" alt="" />
                    </span>
                            <div className="store_part3_padding">
                                <div className="left">
                                    <div className="title">
                                        <div className="label">当日订单<br />总金额：</div>
                                        <div className="num" id="orderAmount">54.80</div>
                                    </div>
                                    <div className="content">
                                        <div className="content-title">订单总数</div>
                                        <div className="content-table">
                                            <div className="content-table-left">
                                                <div className="content-table-left-title">当日</div>
                                                <div className="content-table-left-text" id="orderQuanttity">2</div>
                                            </div>
                                            <i></i>
                                            <div className="content-table-right">
                                                <div className="content-table-right-title">历史</div>
                                                <div className="content-table-right-text" id="hisOrderQuanttity">153</div>
                                            </div>
                                        </div>
                                        <div className="content-title">配货单数</div>
                                        <div className="content-table">
                                            <div className="content-table-left">
                                                <div className="content-table-left-title">当日</div>
                                                <div className="content-table-left-text" id="consignmentQuantity">2
                                                </div>
                                            </div>
                                            <i></i>
                                            <div className="content-table-right">
                                                <div className="content-table-right-title">历史</div>
                                                <div className="content-table-right-text"
                                                     id="hisConsignmentQuantity">186
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="title">
                                        <div className="label">历史订单<br />总金额：</div>
                                        <div className="num" id="hisOrderAmount">12761.92</div>
                                    </div>
                                    <div className="content">
                                        <div className="content-title">商品件数</div>
                                        <div className="content-table">
                                            <div className="content-table-left">
                                                <div className="content-table-left-title">当日</div>
                                                <div className="content-table-left-text" id="allQuanttity">5</div>
                                            </div>
                                            <i></i>
                                            <div className="content-table-right">
                                                <div className="content-table-right-title">历史</div>
                                                <div className="content-table-right-text" id="hisAllQuanttity">252</div>
                                            </div>
                                        </div>
                                        <div className="content-title">已发货单数</div>
                                        <div className="content-table">
                                            <div className="content-table-left">
                                                <div className="content-table-left-title">当日</div>
                                                <div className="content-table-left-text" id="consignmentCount">1</div>
                                            </div>
                                            <i></i>
                                            <div className="content-table-right">
                                                <div className="content-table-right-title">历史</div>
                                                <div className="content-table-right-text" id="hisConsignmentCount">160
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="store_cr_center borderY">
                            <span className="titles">
                                <img src={title_right_1} className="img_zoom" alt="" />
                            </span>
                            <ReactEcharts style={{width: '100%', height: '90%'}} option={this.getOption('option2')} />
                        </div>
                        <div className="store_cl_top borderY" style={{height: '40%'}}>
                            <span className="titles">
                                <img src={title_right_3} className="img_zoom" alt="" />
                            </span>
                            <ReactEcharts style={{width: '100%', height: '60%'}} option={this.getOption('option3')} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
