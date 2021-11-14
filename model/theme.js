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

    /**获取E位置的主题详情及spu信息 */
    static getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.locationE)
    }

    /*获取首页位置F的主题信息 */
    async getHomeLocationF() {
        return this.getThemeByName(Theme.locationF)
    }

    /*获取首页位置H的主题信息 */
    async getHomeLocationH() {
        return this.getThemeByName(Theme.locationH)
    }

    /**通过主题名称遍历获取 */
    async getThemeByName(themeName) {
        return await this.themes.find(t => t.name === themeName)
    }



    /**获取主题详情，包含sku信息 */
    static getThemeSpuByName(name) {
        return Http.request({
            url: `theme/name/${name}/with_spu`
        })
    }

}

export { Theme }