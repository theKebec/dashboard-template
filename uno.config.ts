import { defineConfig, presetUno } from "unocss";

const pxToRem = (n: number | string) => `${Number(n) / 100}rem`;

export default defineConfig({
  presets: [presetUno()],
  theme: {
    fontFamily: {
      pmzd: "PangMenZhengDao",
    },
  },
  rules: [
    // ========================
    // 尺寸（w / h）
    // ========================
    [
      /^(w|h)-(-?\d+(\.\d+)?)(px)$/,
      ([, prop, val]) => ({
        [prop === "w" ? "width" : "height"]: pxToRem(val),
      }),
    ],

    // ========================
    // padding / margin（支持方向）
    // ========================
    [
      /^(p|m)([trblxy]?)-(-?\d+(\.\d+)?)(px)$/,
      ([, type, dir, val]) => {
        const isPadding = type === "p";
        const base = isPadding ? "padding" : "margin";

        const map: any = {
          "": base,
          t: `${base}-top`,
          r: `${base}-right`,
          b: `${base}-bottom`,
          l: `${base}-left`,
          x: [`${base}-left`, `${base}-right`],
          y: [`${base}-top`, `${base}-bottom`],
        };

        const prop = map[dir];

        if (Array.isArray(prop)) {
          return Object.fromEntries(prop.map((p) => [p, pxToRem(val)]));
        }

        return {
          [prop]: pxToRem(val),
        };
      },
    ],

    // ========================
    // 定位
    // ========================
    [
      /^(top|left|right|bottom)-(-?\d+(\.\d+)?)(px)$/,
      ([, dir, val]) => ({
        [dir]: pxToRem(val),
      }),
    ],

    // ========================
    // 字体
    // ========================
    [
      /^text-(\d+(\.\d+)?)(px)$/,
      ([, val]) => ({
        "font-size": pxToRem(val),
      }),
    ],

    // ========================
    // 行高
    // ========================
    [
      /^leading-(\d+(\.\d+)?)(px)$/,
      ([, val]) => ({
        "line-height": pxToRem(val),
      }),
    ],

    // ========================
    // 圆角
    // ========================
    [
      /^rounded-(\d+(\.\d+)?)(px)$/,
      ([, val]) => ({
        "border-radius": pxToRem(val),
      }),
    ],

    // ========================
    // gap
    // ========================
    [
      /^gap-(\d+(\.\d+)?)(px)$/,
      ([, val]) => ({
        gap: pxToRem(val),
      }),
    ],

    // ========================
    // 位移
    // ========================
    [
      /^translate-x-(-?\d+(\.\d+)?)(px)$/,
      ([, val]) => ({
        transform: `translateX(${pxToRem(val)})`,
      }),
    ],

    [
      /^translate-y-(-?\d+(\.\d+)?)(px)$/,
      ([, val]) => ({
        transform: `translateY(${pxToRem(val)})`,
      }),
    ],

    // ========================
    // 字间距
    // ========================
    [
      /^tracking-(\d+(\.\d+)?)(px)$/,
      ([, val]) => ({
        "letter-spacing": pxToRem(val),
      }),
    ],
  ],
});
