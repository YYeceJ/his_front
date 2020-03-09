/**
 * Create By qingxiang.luo@hand-china.com
 * On 2018.07.19
 */


/**
 * 使用正则表达式将时间戳转换成指定的字符串形式输出
 * 使用方法： fmtStamp2Str(1531969254, 'yyyy-MM-dd hh:mm:ss')
 * @param dateStr
 * @param fmt
 * @returns {any}
 */
export function fmtStamp2Str(dateStr: any, fmt: any) {
    let date = new Date();
    date.setTime(dateStr*1000);
    if (/(y+)/.test(fmt)) { // 匹配yyyy 替换成年份字符串
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
    }
    let obj: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in obj) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = obj[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt;
}
