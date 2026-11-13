import Schema from "schemastery";

// interface
interface U5RawNotice { // update服务器公告格式
    content: string[],
    title: string,
    title_bg_path?: string
}

interface U5NoticeText {
    content: string[],
    colors: string[] | null
}

interface IU5NDetailItem {    // 单个更新板块中的小内容
    title: string,            // 标题
    title_bg: string,         // 标题背景
    body: U5NoticeText        // 内容
}

interface IU5NSubItem {       // 更新板块
    title: string,            // 标题
    title_bg: string,         // 标题背景
    details: IU5NDetailItem[] // 小内容
}

interface IU5Notice {         // 蛋仔公告主体
    title: string,            // 标题（“10月23日不停服更新”这种）
    header: U5NoticeText,     // 头部内容（“我们已于……”这种）
    sub: IU5NSubItem[]        // 各个更新板块（玩法更新、活动更新……）
}

// constructor
const U5NoticeText: Schema<U5NoticeText> = Schema.object({
    content: Schema.array(Schema.string()),
    colors: Schema.array(Schema.string()) || null
});
const U5NDetailItem: Schema<IU5NDetailItem> = Schema.object({
    title: Schema.string(),
    title_bg: Schema.string(),
    body: U5NoticeText
});
const U5NSubItem: Schema<IU5NSubItem> = Schema.object({
    title: Schema.string(),
    title_bg: Schema.string(),
    details: Schema.array(U5NDetailItem)
});
const U5Notice: Schema<IU5Notice> = Schema.object({
    title: Schema.string(),
    header: U5NoticeText,
    sub: Schema.array(U5NSubItem)
});

function _translate_colors(text: string): U5NoticeText {
    const regex = /#c[0-9a-fA-F]{6}/g;
    const defaultColor = "#34343F";
    let colorArray = Array.from(text.matchAll(regex)).map(m => m[0].replace("#c", "#"));
    colorArray.unshift(defaultColor);
    return {
        content: text.split(regex),
        colors: colorArray
    };
}

export function do_resolve(u5_raw: U5RawNotice[]) {
    const ret: IU5Notice = new U5Notice();
    // header
    ret.title = u5_raw[0].title;
    ret.header = _translate_colors(u5_raw[0].content[0]);
    for (let i = 1; i < u5_raw.length; i++) {
        // 为了好解析只能用笨办法了
        const rawitem = u5_raw[i];
        // real content
        let details: IU5NDetailItem[] = [];
        for (let j = 0; j < rawitem.content.length; j += 2) {
            const splited_subject = rawitem.content[j].split("#image#");
            details.push({
                title: splited_subject[0],
                title_bg: splited_subject[1],
                body: _translate_colors(rawitem.content[j + 1])
            });
        }
        ret.sub.push(new U5NSubItem({
            title: rawitem.title,
            title_bg: rawitem.title_bg_path || "gui2/background/notice/img_lfkbot_placeholder.png",
            details
        }))
    }
    return ret;
}