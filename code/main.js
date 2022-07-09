import kaboom from "kaboom"

// initialize context
kaboom({
  background: [52, 174, 235] // The RGB code
})

// load assets
loadSprite("grass", "sprites/grass.png")
loadSprite("dirt", "sprites/dirt.png")
loadSprite("end", "sprites/end.png")
loadSprite("bean", "sprites/bean.png")
loadSprite("grass2", "sprites/grass2.png")
loadSprite("lava", "sprites/lava.png");
loadSprite("up", "sprites/up.png");
loadSprite("right", "sprites/right.png");
loadSprite("left", "sprites/left.png");
loadSprite("flower", "sprites/flower.png");
loadSprite("bush", "sprites/bush.png");
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
        "                           ",
        "      m   b    |   !       ",
        "     ===  ==   =--==       ",
        "   ==xx         xx         ",
        "                           ",
        "|o m|m     m b|   m  | m  b m        b|mm   m  ",
        "======--========================---=============",
        "xxxx  xx       xxx             xxxx   xxx     x"
    
    ],
    [
        "                       m    |" ,
        "                       =    =     b",
        "                   =              =-=",
        "        |     m  b x               x         ",
        "        =     =  =         ",
        "   |m   x                  ",
        "   ==                      ",
        " om  mm      bm    |m     mm   m      m  bmm  !",
        "=========   ===--=====   ========     =========",
        "xxxx  xx       xxx        x    xx     xxx     x"
    ],
    [
        "                           ",
        "                     m     ",
        "                     =    !",
        "            m     |  x   b=",
        "        =   =     =      =x",
        "    |       x              ",
        "    ==                      ",
        " o   x   m    m b      |mm  ",
        "==--=x====   =====    ======",
        "xxxx  xx       xxx    xxx   "
    ],
    [
        "                           ",
        "                           ",
        "                           ",
        "                          !",
        "                          =",
        "                 m    |    ",
        "                 =    =    ",
        " o     |b    = =  m  |mmm  ",
        "==     ===  =x=x--=========",
        "xx             xxx     xxx "
    ],
    [
        "                  m  |mb      m    m        ",
        "                =========-----==   =        ",
        "                x     xx xxxxxxx     b      ",
        "                      x     xxxx  m  =   mo ",
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
        "m|    b   m m       b    ||  mm b m|      m     m    |bm     m    b         m   | b    b      b m",
        "===   =   = =  = =  =  = ==  == = ===   = = === = = ==== = === =  = = ===   =-=== = = === = = = =",
        " xx       x    x         xx       xx      x  xx   x   xx x     x      x x    xxx       xx   x   x",
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
            scale(0.5),
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
})
const bean = get("bean")[0]



onKeyDown("left", () => {
	bean.move(-SPEED, 0)
})

onKeyDown("right", () => {
	bean.move(SPEED, 0)
})

onKeyDown("up", () => {
	if(bean.isGrounded()){
        bean.jump(820)
    }
})
bean.onCollide("end", () => {
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
    const up = add([
        sprite("up"),
        pos(100, 100),
        fixed(),
    ])
    go("game",{
        levelIdx:0,
    })
}


start()
