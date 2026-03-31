export default {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 100, // 1rem = 100px
      propList: ["*"], // 所有属性都转换
      selectorBlackList: ["html"], // html不转换
      minPixelValue: 2, // 小于2px不转换
    },
  },
};
