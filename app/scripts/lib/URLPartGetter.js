import {Config, UrlConfig} from '../global-config';

export default class URLPartGetter {
    static get() {
        return Config.DEV_MODE ?
            UrlConfig.APP_URL_PART_DEV:
            UrlConfig.APP_URL_PART_PROD
    }
}