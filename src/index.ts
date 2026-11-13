import { Context, h, Schema } from 'koishi'
import { do_resolve } from "./notice";
import { readFileSync, existsSync } from 'fs';
import "@koishijs/plugin-server";
import { join as pathJoin } from 'path';

export const name = 'lifuka-bot';
export const inject = ["server"];

export interface Config {
    notice_url: string
}

export const Config: Schema<Config> = Schema.object({
    notice_url: Schema.string().description("获取公告的地址，默认即可。").default("https://u5.update.netease.com/game_notice/other_channel.txt")
})

export function apply(ctx: Context, config: Config){
    // assets server
    ctx.server.get(/^\/lfkbot-assets\/(.*)/, async (router, next) => {
        const assets_dir_prefix = pathJoin(__dirname, "..", "assets"); // 为什么koishi的output是cjs
        const url = router.request.url.replace("/lfkbot-assets", "");
        if (url == "/debug") {
            router.response.body = `hello from lifuka uwu\n\n\n--debug--\nrouter: ${JSON.stringify(router)}\nurl (parsed): ${url}\nbasedir: ${assets_dir_prefix}`;
            return
        }
        const localpath = pathJoin(assets_dir_prefix, url)
        if (existsSync(localpath)) {
            //
        } else {
            router.throw(404, "lifuka cant find this file!! TvT")
        }
    });
    ctx.command("notice").action(async (_) => {
        return h("quote", { id: _.session?.messageId }) + JSON.stringify(do_resolve(await (await fetch(config.notice_url)).json()))
    });
}
