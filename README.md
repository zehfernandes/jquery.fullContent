# Jquery.fullContent

## Markup

```html
<div id="container">
	
		<div id="stage1">
			//The content of this page
		</div>
		
		<div id="stage2">
			//The content of this page
		</div>
		
</div>
```

The id of stage is how you link
```html
<a href="#stage2">Go to stage2</a>
```



## Style

Don't show scroll bars
```css
body { overflow-x: hidden; overflow-y: hidden; }
```

In case you need vertical scroll
```css
stage1 { overflow-y: auto; }
```


## Javascript

Put Jquery, ScrollTo Plugin and Jquery.fullContent
```html
<script src="js/jquery-1.x.x.min.js" type="text/javascript"></script>
<script src="js/jquery.jquery.scrollTo.js" type="text/javascript"></script>
<script src="js/jquery.jquery.myplugin.js" type="text/javascript"></script>
```

And you can configure this parameters:
```javascript
$('#container').fullContent({
	stages: 'div',
	mapPosition: [{v: 1, h: 1}, {v: 1, h: 2}, {v: 2, h: 1}, {v: 2, h: 2}],
	stageStart: 1,
	idComplement: 'page_'
});
```

## The Map Positon

This parameter you can configuring the position which want your stage.
V - vertical position
H - horizontal position

For example
```
v1h1 | v1h2
v2h1 | v2h2
```



