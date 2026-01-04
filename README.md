# Dev mode

Install pnpm if you don't have it.
`npm i -g pnpm`

install modules
`pnpm i`

run as dev mode
`pnpm dev`

since you are probably running this solely, it wont connect ferrumc by itself
add ?ws_port=9000 to specify ws port (which port is ferrumc dashboard is available at)

# Building

Install pnpm if you don't have it.
`npm i -g pnpm`

install modules
`pnpm i`

run as dev mode
`pnpm build`

there you go, you can look at the `./build` folder

it should be something similar to this:
```
build
├── _app
│   ├── env.js
│   ├── immutable
│   │   ├── assets
│   │   │   ├── 0.DK2F3TiV.css
│   │   │   └── 2.CaclQiDf.css
│   │   ├── chunks
│   │   │   ├── _0SE5BM9.js
│   │   │   ├── B0VuPwGa.js
│   │   │   ├── BsRj1CIK.js
│   │   │   ├── Ckf7vI0t.js
│   │   │   ├── CL4QMSaM.js
│   │   │   ├── CT0T0Gak.js
│   │   │   ├── CZobiwMx.js
│   │   │   ├── DShSse47.js
│   │   │   ├── lcHooioP.js
│   │   │   └── Np4uj_ln.js
│   │   ├── entry
│   │   │   ├── app.K2miTMXF.js
│   │   │   └── start.CeZMXrp4.js
│   │   └── nodes
│   │       ├── 0.Ouy00lpG.js
│   │       ├── 1.DEYJthKk.js
│   │       ├── 2.DganLgSn.js
│   │       ├── 3.Dy140cfI.js
│   │       ├── 4.BR8NlVsX.js
│   │       └── 5.C-xy2jUo.js
│   └── version.json
├── config.html
├── console.html
├── favicon.ico
├── index.html
├── players.html
└── robots.txt
```