export function waterMarkInit(data){
    drawWaterMark(data);
}

window.waterMarkInit = waterMarkInit;


function setTextInfo(data){
    
    let o = {};

    if(data.custom){
        o.name = data.waterMarkText;
    }else{
        if(data.auth_data && data.auth_data.name){
            o.name = data.auth_data.name || '';
        }else{
            o.name = data.domain + '_' + data.username;
        }
    }
    if(data.desc){
        let t = new Date()
        let time = t.getFullYear().toString() + t.getMonth() + t.getDate() + t.getHours() + t.getMinutes() + t.getSeconds();
        o.name = data.username + '_' + data.contact;
        o.desc = data.desc;
        o.time = data.last_login_time || time; 
        o.textList = [o.name, o.time,o.desc];
    }else{
        o.textList = [o.name]
    }

    return o;
}

var getListMax = function(arr){
    return Math.max.apply({}, arr)
}

function drawImage(textInfo){
    const fontSize = textInfo.fontSize || 16;//字体大小
    const color = textInfo.color || 'rgba(0,0,0,0.08)';
    const textList = textInfo.textList;//所有水印要显示的文字内容都放在这个数组里
    
    const lengthList = []
    //每个要显示的字段的文字长度
    const angle = -30 * Math.PI / 210//整个canvas旋转角度
    const eachHeight = fontSize * 1.618//每个文字+间距的高度(跟文字成黄金比例)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    _.forEach(textList,(v)=>{
        lengthList.push(v.length)
    })
    let max = getListMax(lengthList);
    if(max <= 3){//todo 暂时打个补丁,后面会精确计算 by KI-WI
        max = 5;
        const offsetY = fontSize * max//canvas旋转之后 y轴偏移量 为了防止文字显示不全
        canvas.width = fontSize * max / Math.cos(angle) +  offsetY / Math.tan(Math.abs(angle));
        canvas.height = lengthList.length * eachHeight + offsetY;
        context.rotate(angle);
        context.translate(0, offsetY);
    }
    else{
        const offsetY = fontSize * max//canvas旋转之后 y轴偏移量 为了防止文字显示不全
        canvas.width = fontSize * max / Math.cos(angle) +  offsetY;
        canvas.height = lengthList.length * eachHeight + offsetY;
        console.log(canvas.width)
        console.log(canvas.height)
        context.rotate(angle);
        context.translate(0, offsetY *  Math.tan(Math.abs(angle)));
    }
    
    context.fillStyle = color;
    context.font = `normal ${fontSize}px Microsoft Yahei`;
    context.textAlign = "center"; 

    _.forEach(textList,(v,i)=>{
        context.fillText(v, 100, i * eachHeight);
    })

    const base64Url = canvas.toDataURL();
    // document.removeChild(canvas);
    return base64Url;
}


function drawWaterMark(info){ 
    var cssStyle;
    if(info.custom || Number(info.security_info.watermark_strategy) || info.auth_info.name){
        let textInfo = setTextInfo(info);
        
        textInfo.color = 'rgba(0,0,0,0.20)';
        // textInfo.color = 'red';
        var blackWatermarkImg = drawImage(textInfo);
        textInfo.color = 'rgba(255,255,255,0.20)';
        // textInfo.color = 'red';
        var whiteWatermarkImg = drawImage(textInfo);

        cssStyle = '.water-mark-dark{background-image:url('+ blackWatermarkImg +'); background-repeat:repeat} .water-mark-white{background-image:url('+ whiteWatermarkImg +');background-repeat:repeat}';
    }else{
        cssStyle = '.water-mark-dark{background:none;}.water-mark-white{background:none;}'
    }

    if(!document.getElementById('watermarkStyle')){
        var styleElem = document.createElement('style');

        styleElem.textContent = cssStyle;

        styleElem.setAttribute('id','watermarkStyle')

        document.head.appendChild(styleElem);
    }else{
        document.getElementById('watermarkStyle').textContent = cssStyle;
    }


}
