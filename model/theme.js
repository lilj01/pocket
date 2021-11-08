import { Http } from "../utils/http";

/*主题 */
class Theme{
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    /**合并http请求，做为主题 AEFH位置主题的容器 */
    themes = []

    /**获取主题列表 */
    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names: names
            }
        })
    }

    /*获取首页位置A的主题信息 */
    async getHomeLocationA() {
        return this.getThemeByName(Theme.locationA)
    }

    /*获取首页位置E的主题信息 */
    async getHomeLocationE() {
        return this.getThemeByName(Theme.locationE)
    }

    /**通过主题名称遍历获取 */
    async getThemeByName(themeName) {
        return await this.themes.find(t => t.name === themeName)
    }

}

export { Theme }