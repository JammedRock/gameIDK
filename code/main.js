import kaboom from "kaboom"

kaboom({
  background: [52, 174, 235]
})


loadSprite("grass", "sprites/grass.png")
loadSprite("dirt", "sprites/dirt.png")
loadSprite("end", "sprites/end.png")
loadSprite("bean2", "sprites/bean.png")
loadSprite("grass2", "sprites/grass2.png")
loadSprite("flower", "sprites/flower.png");
loadSprite("bush", "sprites/bush.png");
loadSprite("sign0", "sprites/sign1.png");
loadSprite("sign1", "sprites/sign2.png");
loadSprite("sign2", "sprites/sign3.png");
loadSprite("sign3", "sprites/sign4.png");
loadSprite("sign4", "sprites/sign5.png");
loadSprite("sign5", "sprites/sign6.png");
loadSprite("sign6", "sprites/sign7.png");
loadSprite("sign7", "sprites/sign8.png");
loadSprite("sign8", "sprites/sign9.png");
loadSprite("sign9", "sprites/sign10.png");
loadSound("end", "sounds/end.mp3");
loadSprite("lava", "sprites/lava.png");
loadSprite("end", "sprites/end2.png",{
    	sliceX: 4,
	anims: {
		"idle": {
			from: 0,
			to: 3,
			speed: 5,
			loop: true,
		},
	},
})
loadSprite("bean", "sprites/bean4.png",{
    	sliceX:15,
	anims: {
		"idle": {
			from: 0,
			to: 10,
			speed: 10,
			loop: true,
		},
        "jump":{
          from:12,
            to:14,
            speed:50,
            loop:false,
        },
	},
})
const SPEED = 320
const FALL_DEATH = 2400
level = 0

layers([
    "game",
    "ui",
],"game")


const LEVELS = [
    [
    
        "                           ",
        "                           ",
        "o                          ",
        "      m   b    |   !       ",
        "     ===  ==   =--==       ",
        "   ==xx         xxx        ",
        "                           ",
        "|  i|m     m b|   m  | m  b m        b|mm   m  ",
        "======--========================---=============",
        "xxxx xxxx      xxx             xxxx   xxx     x"
    
    ],
    [
        " o                     m    |" ,
        "                       =    =     b",
        "                   =              =-=",
        "        |     m  b x               x         ",
        "        =     =  =         ",
        "   |m   x                  ",
        "   ==                      ",
        "  i  mm      bm    |m     mm   m      m  bmm  !",
        "=========   ===--=====   ========     =========",
        "xxxx  xx       xxx        x    xx     xxx     x"
    ],
    [
        "o                          ",
        "                     m     ",
        "                     =    !",
        "            m     |  x   b=",
        "        =   =     =      =x",
        "    |       x              ",
        "    ==                      ",
        " i   x   m    m b      |mm  ",
        "==--=x====   =====    ======",
        "xxxx  xx       xxx    xxx   "
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "o                         !",
        "                          =",
        "                 m    |    ",
        "                 =    =    ",
        " i     |b    = =  m  |mmm  ",
        "==     ===  =x=x--=========",
        "xx             xxx     xxx "
    ],
    [
        "                  m  |mb      m    m      o ",
        "                =========-----==   =        ",
        "                x     xx xxxxxxx     b      ",
        "                      x     xxxx  m  =   i  ",
        "                              xx--===x=--===--=",
        "                                xxx    xxx  xxx",
        "                                          m!",
        "                                          ==",
        "                       m     b     | m  =-xx",
        "                =    ====    ==   ======xxxxx"
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        " o                         ",
        "m|i   b   m m       b    ||  mm b m|      m     m    |bm     m    b         m   | b    b    ! b m",
        "===   =   = =  = =  =  = ==  == = ===   = = === = = ==== = === =  = = ===   =-=== = = === = = = =",
        " xx       x    x         xx       xx      x  xx   x   xx x     x      x x    xxx       xx   x   x",
    ],
    [
        "  o     ! mm b ",
        "      =========",
        "        xxxxxxx===",
        "                    m|",
        "             bm   b===",
        "mmi|   bb m====--==xxx",
        "====---====xxxxxx",
        "x  xxxxx xx  xx",
    ],
    [
        "                                                   m    b  | |  mm",
        "  o                              m    b           ==    = == == ===      m!",
        "                   b|        =   =    =  =    =   xx    x xx xx xxx     ===",
        "         m|     b ====---=   x   x    x  x    x",
        "  mi  =====-=--===xxxxxxxx",
        "======xxx xxxxxx",
    ],
    [
        "   o        | m m m b|",
        "           =============  |mm",
        "     =             xxxxx=====",
        "=                        |bbm",
        "  mim |           !  m ======",
        "========---------======xxxx",
        "xxxxx  xxxxxxxxxxx   x",
    ],
    [
        " || oimb ",
        "=========",
        "xx   xx x",
    ],
    ]
    scene("game", ({ levelIdx }) => {
        gravity(1600)
        addLevel(LEVELS[levelIdx || 0],{
        width:64,
        height:64,
        "=": () => [
            sprite("grass"),
            area(),
            solid(),
        ],
        "o": () => [
            scale(0.9),
            sprite("bean"),
            area(),
            solid(),
            body(),
            origin("bot"),
            "bean",

        ],
        "x": () => [
            sprite("dirt"),
            area(),
            solid(),
        ],
        "!": () => [
            sprite("end"),
            area(),
            "end",
        ],
        "m": () => [
            sprite("grass2"),
            area(),
        ],
        "-": () => [
            sprite("lava"),
            area(),
            "kill",
            "lava",
        ],
        "|": () => [
            sprite("flower"),
            area(),
            layer("ui")
        ],
        "b": () => [
            sprite("bush"),
            area(),
        ],
        "i": () => [
            sprite("sign"+level),
            area(),
        ],
})
const bean = get("bean")[0]
if (level != LEVELS.length - 1){
    const end = get("end")[0]
    end.play("idle")
    bean.play("idle")
}

bean.onGround(() => {
    bean.play("jump")
    wait(0.5, ()=> {
        bean.play("idle")
    })
})


onKeyDown(["left","a"], () => {
	bean.move(-SPEED, 0)
})

onKeyDown(["right","d"], () => {
	bean.move(SPEED, 0)
})

onKeyDown(["up","w"], () => {
	if(bean.isGrounded()){
        bean.jump(820)
    }
})
bean.onCollide("end", () => {
    play("end")
    if (levelIdx < LEVELS.length - 1){
        level += 1
        go("game",{
            levelIdx: levelIdx + 1
        })
    }else{
    }
})
bean.onCollide("kill", () => {
    wait(0.5, () => {
        die()
    })
})
    
bean.onUpdate(() => {
    camPos(bean.pos)
    if (bean.pos.y >= FALL_DEATH){
        die()
    }
})

})

function die(){
    go("game",{
        levelIdx:level,
    })
}

function start(){
    go("game",{
        levelIdx:0,
    })
}


start()
