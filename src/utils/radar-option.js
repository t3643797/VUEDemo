//radar-option.js

export const option = {
    title: {
        text: "",//图表显示的标题
        subtext: ""//图表显示的副标题
    },
    tooltip: {
        trigger: "axis"
    },
    //不显示“点击可隐藏的按钮块”
    // legend: {
    //     orient: "vertical",
    //     x: "right",
    //     y: "bottom",
    //     //data: ["预算分配", "实际开销"]
    //     data: ["实际开销"]
    // },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: false,  //显示数据视图图标
                readOnly: false
            },
            restore: {
                show: false  //显示刷新图标
            },
            saveAsImage: {
                show: false //显示下载图标
            }
        }
    },
    radar: {//雷达图必须设置radar
        name: {
            textStyle: {
                color: '#000',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            {
                text: "销售",
                max: 6000,
                min: 0,
            },
            {
                text: "管理",
                max: 16000,
                min: 0
            },
            {
                text: "信息技术",
                max: 30000,
                min: 0
            },
            {
                text: "客服",
                max: 38000,
                min: 0
            },
            {
                text: "研发",
                max: 52000,
                min: 0
            },
            {
                text: "市场",
                max: 25000,
                min: 0
            }
        ]
    },
    calculable: true,
    //雷达图背景的颜色，完全不透明为0
    splitArea: {
        show: true,
        areaStyle: {
            color: 'rgba(255,0,0,0)'//图表背景的颜色
        }
    },
    //雷达图网格的颜色
    splitLine: {
        show: true,
        LineStyle: {
            width: 1,
            color: 'rgba(131,141,158,.1)'//图表网格的颜色
        }
    },
    series: [
        // {
        //     name: "",
        //     type: "radar",
        //     data: [
        //         {
        //             value: [4300, 10000, 28000, 35000, 50000, 19000],
        //             name: "预算分配"
        //         }
        //     ]
        // },
        {
            name: "雷达图",
            symbol: 'circle',//拐点的样式，还可以rect，angle等
            symbolSize: 8,//拐点的大小
            type: "radar",
            areaStyle: {
                normal: {
                    width: 1,
                    opacity: 0.2
                }
            },
            data: [
                {
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value;
                        }
                    },
                    name: "实际开销",
                    //设置区域边框和区域颜色
                    itemStyle: {
                        normal: {
                            color: '#F75325',////显示颜色与填充颜色对应
                            lineStyle: {
                                color: 'rgba(255,255,0,1)'
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#F75325'    //填充的颜色
                        }
                    }
                }
            ],
            // animation: false
        }
    ]
}