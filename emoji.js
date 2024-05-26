let recipe = [
    {material: ['🪨','🪨'],res: '🗻'},
    {material: ['🗻','🗻'],res: '🪐'},
    {material: ['🪐','🪨'],res: '☄️'},
    {material: ['☄️','🗻'],res: '🌋'},
    {material: ['🌋','🌋'],res: '☀️'},
    {material: ['☀️','☀️'],res: '⭐️'},
    {material: ['⭐️','⭐️'],res: '🌌'},
    {material: ['☄️','☄️'],res: '🌑'},
    {material: ['🌑','☀️'],res: '🌕'},
    {material: ['🌋','🪨'],res: '🌫️'},
    {material: ['🌫️','🌫️'],res: '☁️'},
    {material: ['☁️','☁️'],res: '🌧️'},
    {material: ['🌧️','🌧️'],res: '💧'},
    {material: ['💧','💧'],res: '🌊'},
    {material: ['🌋','🌊'],res: '🦠'},
    {material: ['🦠','🌊'],res: '🪸'},
    {material: ['🦠','🦠'],res: '🪼'},
    {material: ['🪼','🪼'],res: '🐟'},
    {material: ['🦠','☀️'],res: '🌱'},
    {material: ['🌱','🌱'],res: '🌲'},
    {material: ['🌲','🗻'],res: '⛰️'},
    {material: ['⛰️','⛰️'],res: '🌎'},
    {material: ['⛰️','🐟'],res: '🐸'},
    {material: ['🐸','🐸'],res: '🦎'},
    {material: ['🦎','🦎'],res: '🐾'},
    {material: ['🐵','🐵'],res: '👨‍🦲'},
];
let emojiAll = [{emoji: '🪨',x: 500, y: 100,drag: false}];
let copy = false;
let copyDrag = false;
let drag = false;
var emojiSize =  60;
function setup() {
    createCanvas(windowWidth, windowHeight,);
    emojiAll[0].x = windowWidth/2
    emojiAll[0].y = windowHeight/2
}
function draw() {
    pro();
    background(220);
    
    for (let i = 0; i < Object.keys(emojiAll).length; i++) {
        var emojiInfo = emojiAll[i]
    push();
    textSize(emojiSize);
   text(emojiInfo.emoji,emojiInfo.x,emojiInfo.y);
   pop();
    }
   push();
   textSize(30);
   text('🤏',mouseX-10,mouseY+10)
   pop();
}
function pro(){
    if(mouseIsPressed){
        for (let i = 0; i < Object.keys(emojiAll).length; i++) {
            var emojiInfo = emojiAll[i]

            //絵文字をドラッグする
            if((emojiInfo.x < mouseX + 10 )&&(emojiInfo.y < mouseY + 50)){//左上から
                if((emojiInfo.x + 80 > mouseX)&&(emojiInfo.y > mouseY - 20)){//右下から
                    if (mouseButton === LEFT && !drag) {
                        emojiInfo.drag = true
                        drag = true;
                    }else{
                        if(!copy&&!drag){
                            let emojicopy  = {emoji: emojiInfo.emoji,x: emojiInfo.x,y: mouseY,drag: true};
                            emojiAll.push(emojicopy)
                            copy = true
                            console.log(`複製${emojiInfo.emoji}`)
                        }else{
                            if(emojiInfo.drag)copyDrag = true;
                        }
                    }
                }
              }
        }
    } else{//マウスを離した
copy = false;
copyDrag = false;
drag = false;
for (let i = 0; i < Object.keys(emojiAll).length; i++) {
    var emojiInfo = emojiAll[i]
    if(emojiInfo.drag){//絵文字を置いた
        for (let i2 = 0; i2 < Object.keys(emojiAll).length; i2++) {
            var emojiInfo2 = emojiAll[i2]
            if((emojiInfo.x < emojiInfo2.x + emojiSize)&&(emojiInfo.y < emojiInfo2.y + emojiSize)){//左上から
                if((emojiInfo.x + emojiSize > emojiInfo2.x)&&(emojiInfo.y + emojiSize > emojiInfo2.y)){//右下から
                    if(!emojiInfo2.drag){
                       let com = syn(emojiInfo.emoji,emojiInfo2.emoji)
                        if(com != `null`){
                            emojiInfo.emoji = com
                             emojiAll.splice( i2, 1 );
                        }
                    }
                }
            }
        }
        emojiInfo.drag = false;
    }

}
}
for (let i = 0; i < Object.keys(emojiAll).length; i++) {
    var emojiInfo = emojiAll[i]
if((emojiInfo.drag && !copy) || (emojiInfo.drag && copyDrag)){
    emojiInfo.x = mouseX-30
    emojiInfo.y = mouseY+20
    
    }

}

}
function syn(emoji1,emohi2){//合成
    let com = `null`;
    console.log(`重なってます${emoji1 + emohi2}`);
    let mat = [emoji1,emohi2];
    for(let i = 0; i < Object.keys(recipe).length; i++){
        var recipeInfo = recipe[i];
        var reC = mat.indexOf(recipeInfo.material[0]);
        if((reC === 0 && mat[1] === recipeInfo.material[1]) || (reC === 1 && mat[0] === recipeInfo.material[1])){
            console.log(`レシピあり${recipeInfo.res}`)
            com = recipeInfo.res
        }
    }
    return com
}
document.oncontextmenu = (e) => {//コンテキ無効
    e.preventDefault();
}