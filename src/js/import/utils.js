export const media = {
    xsBreakpoint: 480,
    smBreakpoint: 576,
    mdBreakpoint: 768,
    lgBreakpoint: 992,
    xlBreakpoint: 1200,
    xxlBreakpoint: 1400,
    xBreakpoint: 1660,
    xs: () => {
        return window.matchMedia(`(min-width: ${media.smBreakpoint}px)`).matches;
    },
    sm: () => {
        return window.matchMedia(`(min-width: ${media.smBreakpoint}px)`).matches;
    },
    md: () => {
        return window.matchMedia(`(min-width: ${media.mdBreakpoint}px)`).matches;
    },
    lg: () => {
        return window.matchMedia(`(min-width: ${media.lgBreakpoint}px)`).matches;
    },
    xl: () => {
        return window.matchMedia(`(min-width: ${media.xlBreakpoint}px)`).matches;
    },
    xxl: () => {
        return window.matchMedia(`(min-width: ${media.xxlBreakpoint}px)`).matches;
    },
    x: () => {
        return window.matchMedia(`(min-width: ${media.xBreakpoint}px)`).matches;
    }
}
