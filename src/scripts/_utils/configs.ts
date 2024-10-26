export function useConfig() {
    return {
        default: hexo.config,
        theme: hexo.theme.config
    }
}
