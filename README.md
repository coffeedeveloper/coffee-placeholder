## 让IE7-8的input元素支持HTML5的placeholder

### 使用方法
	$('input[placeholder]').placeholder()

### 备注
对于`<input type="password" />`的处理方式是在外层生成一个`<label />`容器，并在用一个`<span />`来定位提示文字。
因此如果发生提示文字位置不正确或者样式不对，请自行清除对label或者span的额外样式。
