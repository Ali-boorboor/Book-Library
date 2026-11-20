import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#5B5BD6",
    colorInfo: "#5B5BD6",

    colorSuccess: "#16A34A",
    colorWarning: "#D97706",
    colorError: "#DC2626",

    colorText: "#1E293B",
    colorTextSecondary: "#64748B",
    colorTextTertiary: "#94A3B8",

    colorBgBase: "#F6F7FB",
    colorBgContainer: "#FFFFFF",

    colorBorder: "#D9DEEA",
    colorBorderSecondary: "#E8EBF2",

    borderRadius: 10,
    borderRadiusLG: 20,
    borderRadiusSM: 8,

    controlHeight: 40,
    controlHeightLG: 46,

    fontSize: 14,

    boxShadow: "0 8px 30px rgba(30, 41, 59, 0.06)",

    boxShadowSecondary: "0 20px 60px rgba(30, 41, 59, 0.10)",
  },

  components: {
    Button: {
      borderRadius: 10,

      primaryShadow: "0 8px 20px rgba(91, 91, 214, 0.24)",
    },

    Card: {
      borderRadiusLG: 20,

      colorBgContainer: "rgba(255, 255, 255, 0.82)",

      colorBorderSecondary: "rgba(255, 255, 255, 0.9)",
    },

    Table: {
      headerBg: "#F7F8FC",
      headerColor: "#475569",

      rowHoverBg: "#F8F8FF",

      borderColor: "#E8EBF2",
    },

    Input: {
      colorBgContainer: "#FFFFFF",
      colorBorder: "#D6DAE5",

      activeBorderColor: "#5B5BD6",
      hoverBorderColor: "#9292E8",

      activeShadow: "0 0 0 3px rgba(91, 91, 214, 0.10)",
    },

    InputNumber: {
      colorBgContainer: "#FFFFFF",
      colorBorder: "#D6DAE5",

      activeBorderColor: "#5B5BD6",
      hoverBorderColor: "#9292E8",

      activeShadow: "0 0 0 3px rgba(91, 91, 214, 0.10)",
    },

    Modal: {
      borderRadiusLG: 20,

      contentBg: "#FCFCFD",
      headerBg: "transparent",

      boxShadow: "0 24px 80px rgba(15, 23, 42, 0.16)",
    },

    Form: {
      labelColor: "#334155",
      labelFontSize: 13,
      itemMarginBottom: 18,
    },

    Tag: {
      borderRadiusSM: 8,
    },

    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
};

export default theme;
