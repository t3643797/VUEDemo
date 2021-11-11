<template>
  <div ref="myCharts" class="echart" style="width: 600px; height: 600px">
    图片内容
  </div>
</template>
<script>
export default {
  name: "mutilradar",
  data() {
    return {
      //定义一个数组，作为图表对象存储，实例化一个对象后，就PUSH进去，适应页面变化时候，就遍历这个数组
      echartsArr: [],
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    // this._getCategory();
    this.chart();
    this.initEchart();
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        let data = res.data.data;
        this.bookCategory(this.formatData(data));
      });
    },
    formatData(data) {
      let indicator = [];
      let bookCat = [];
      let borrowCat = [];
      data.book.forEach((info) => {
        let key = info.category;
        let value = info.number;
        bookCat[key] = value;
      });
      let bookValues = Object.values(bookCat); //book中的number组成的数组
      let bookMax = Math.max(...bookValues);
      let bookKeys = Object.keys(bookCat); //book数组中的category组成的数组
      bookKeys.forEach((key) => {
        data.borrow.forEach((item) => {
          if (item.category == key) {
            borrowCat[key] = item.number;
          }
        });
      });

      let borrowValues = Object.values(borrowCat);
      let borrowMax = Math.max(...borrowValues);
      let max = bookMax > borrowMax ? bookMax : borrowMax;
      bookKeys.forEach((item) =>
        indicator.push({
          name: item,
          max: max,
        })
      );
      let result = {
        indicator: indicator,
        bookCat: bookValues,
        borrowCat: borrowValues,
      };
      return result;
    },
    bookCategory(data) {
      let bookCategoryChart = echarts.init(this.$refs.myCharts);
      let option = {
        tooltip: {
          trigger: "item",
          position: function (p) {
            //其中p为当前鼠标的位置
            return [p[0], p[1]];
          },
        },
        legend: {
          orient: "vertical",
          right: "5%",
          textStyle: {
            color: "#DFE0E5",
            fontWeight: "bold",
          },
          data: ["书刊类别分布", "借阅类别分布"],
        },
        radar: {
          splitNumber: 2, // 雷达图圈数设置
          center: ["50%", "50%"],
          radius: "65%",
          name: {
            textStyle: {
              color: "#DFE0E5",
              backgroundColor: "#121E36",
            },
          },
          indicator: data.indicator,
          splitArea: {
            show: false,
            areaStyle: {
              color: "rgba(255,0,0,0)", // 图表背景的颜色
            },
          },
        },
        series: [
          {
            name: "书刊类别 vs 借阅类别",
            type: "radar",
            data: [
              {
                value: data.bookCat,
                name: "书刊类别分布",
                itemStyle: {
                  normal: {
                    color: "#F75325", //显示颜色与填充颜色对应
                  },
                },
                areaStyle: {
                  normal: {
                    color: "#F75325", //填充的颜色
                  },
                },
              },
              {
                value: data.borrowCat,
                name: "借阅类别分布",
                itemStyle: {
                  normal: {
                    color: "#7B52CC",
                  },
                },
                areaStyle: {
                  normal: {
                    color: "#7B52CC",
                  },
                },
              },
            ],
          },
        ],
      };
      bookCategoryChart.setOption(option);
    },
    initEchart() {
      //页面有多个echarts表，多个图表自适应
      window.addEventListener("resize", () => {
        // this.chart = echarts.init(this.$refs.myCharts);
        // this.chart.resize();
        // echartsArr.push(this.$refs.myCharts);//将对象PUSH进数组
        for (var i = 0; i < echartsArr.length; i++) {
          echartsArr[i].resize();
        }
      });
    },
    chart() {
    var  option = {
        title: {
          text: "基础雷达图",
        },
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "销售（sales）", max: 6500 },
            { name: "管理（Administration）", max: 16000 },
            { name: "信息技术（Information Techology）", max: 30000 },
            { name: "客服（Customer Support）", max: 38000 },
            { name: "研发（Development）", max: 52000 },
            { name: "市场（Marketing）", max: 25000 },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "预算分配（Allocated Budget）",
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: "实际开销（Actual Spending）",
              },
            ],
          },
        ],
      };
       let myChart = this.$echarts.init(this.$refs.myCharts);
      // 绘制图表
      myChart.setOption(option);
    },
  },
};
</script>