# 初期セットアップ

## 参考URL

[Electron + TypeScript + React + Webpackのプロジェクト作成から基本操作まで](https://qiita.com/uta-member/items/0590bb3832cac9fd41ec)

## ステップ

### Electronプロジェクトを作成

```sh
npm init electron-app@latest ddd-electron-react-ts -- --template=webpack-typescript
```

### Reactをインストール

```sh
npm i react react-dom
npm i --dev @types/react @types/react-dom
```

### ディレクトリ構造を変更

下記のように、ディレクトリ構造とファイル名を変更する。  

```sh
+-- main
|   +-- index.ts => main.ts  
|   +-- preload.ts  
|
+-- renderer
|   +-- index.css
|   +-- index.html  
|   +-- renderer.ts => index.tsx
```

上記の変更に伴い、下記のファイルを変更する。

`forge.config.ts`

```ts
        ...
        entryPoints: [
          {
            html: './src/renderer/index.html',
            js: './src/renderer/index.tsx',
            name: 'main_window',
            preload: {
              js: './src/main/preload.ts',
            },
          },
        ],
```

`webpack.main.config.ts`

```ts
  ...
  entry: './src/main/main.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    modules: ["./src", "./node_modules"],
  },
```

`webpack.renderer.config.ts`

```ts
  ...
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    modules: ["./src", "./node_modules"],
  },
```

`tsconfig.json`

```json
    ...,
    "baseUrl": "./src",
    ...,
    "strict": true,
    "jsx": "react-jsx",
    ...    
```

### Reactコンポーネント表示

`src\renderer\app\page.tsx`

```tsx
const IndexPage = () => {
  return (
    <div>IndexPage</div>
  )
}

export default IndexPage
```

`src\renderer\index.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import IndexPage from './app/page';
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <IndexPage />
  </React.StrictMode>
);
```

`src\renderer\index.html`

```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <!-- <meta
      http-equiv="Content-Security-Policy"
      content="script-src 'self' 'unsafe-inline'"
    /> -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DDD Electron React TS</title>
</head>

<body>
  <!-- React アプリのマウントポイント -->
  <div id="root"></div>
</body>

</html>
```
