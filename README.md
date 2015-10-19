## 让IE7-8的input元素支持HTML5的placeholder

### 使用方法

```js
$('input[placeholder]').placeholder()
```

### 目前支持元素

- `input[type=text]`
- `input[type=email]`
- `input[type=url]`
- `input[type=tel]`
- `input[type=number]`
- `input[type=password]`

### TODO

- `textarea`元素支持
- ~~UMD模块~~

### 备注
对于`<input type="password" />`的处理方式是在外层生成一个`<label />`容器，并在用一个`<span />`来定位提示文字。
因此如果发生提示文字位置不正确或者样式不对，请自行清除对label或者span的额外样式。

此外，对于后期动态生成的`input`需要重新绑定事件。
