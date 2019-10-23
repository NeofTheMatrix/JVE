# Jquery Vue Emulator 0.1
Small API that uses JQuery methods to emulate the definition of the "v-model" directive, the methods and the refs of Vue.js.

Note: This extension has no reactivity system, it is only useful to link DOM elements with an object and methods in the same way that you work in Vue.js, but only using Jquery. It is only for use in basic projects with jquery, if you want to develop a complex project, use Vuejs.

## Example:
Add JVE to the end of the body and after jquery:

```html
<body>
    <div id="root">
      <!-- ..... -->
    </div>
  </div>
</body>

<script src='jquery.js'></script>
<script src='JVE_v0.1.min.js'></script>
<script type="text/javascript">
 //... Instance JVE
</script>
```

### Instance JVE:
You can create a JVE object in the same way as in Vue. The following example shows how to do it:

```js
<script type="text/javascript">
 var jm = new JVE({
		el: '#root',
		data: {
      // It is not necessary to add the elements if you wish, JVE will take them and create them automatically from the j-model attr's
		},
		methods: {
		     Tests: function(){
		  // ....
	       	     }
    		},
	        Ready: function(){
	         // ...
	        }
	})
</script>
```
### Directive j-model:
To differentiate, instead of the v-model directive; use the j-model directive in JVE. It is not necessary to add the elements in data if you wish, JVE will take them and create them automatically from the j-model attributes:

```html
<body>
  <div id="root">
    <input j-model="DataValue" type="text" />
  </div>
</body>
```
```js
<script type="text/javascript">
 var jm = new JVE({
		el: '#root',
		data: {}
	})
  
  $('#Btn').click(function(){
    alert(jm.DataValue)
  })
</script>
```

### Events "j-on:":
Use the events accepted by Jquery with the j-on attribute, which only accepts method names as a value, expressions are not accepted:
```html
<body>
  <div id="root">
    <div class="btn" j-on:click="DoSomething" />Test Botton</div>
    <div class="btn" j-on:click="DoSomething(12,true,'Text')" />Test Botton 2</div>
  </div>
</body>
```
```js
<script type="text/javascript">
 var jm = new JVE({
    el: '#root',
    data: {},
    method: {
      DoSomething: function(a,b,c){
        alert(a); alert(b); alert(c);
      }
    }
	})
</script>
```

### refs:
JVE also allows you to use the references as in vue and react, and use Jquery methods with these:

```html
<body>
  <div id="root">
    <input ref="TextInput" type="text" />
    <div class="btn" j-on:click="ChangeVal" />Change</div>
  </div>
</body>
```
```js
<script type="text/javascript">
 var jm = new JVE({
    el: '#root',
    data: {},
    method: {
      ChangeVal: function(){
        // this.refs['TextInput'].val('Hello Word');
	this.refs.TextInput.val('Hello Word');
      }
    }
})
</script>
```


### Ready hook:
JVE has a hook, Ready, which is executed JVE has finished:
```js
<script type="text/javascript">
 var jm = new JVE({
    el: '#root',
    data: { },
    Ready: function(){
      alert('¡Ready!')
    }
 })
</script>
```

## Complete Sample:
```html
<!DOCTYPE html>
<html>
<head>
	<title>JVE</title>
	<script src='jquery.js'></script>
</head>
<body>
	<div id="root">
		<div class="BackForm">
			<div class="p10">
				<div><b>Campos de texto:</b></div>
				<input 	j-model="Prueba" j-on:keypress="SetValues" type="text" class="m5"/>
				<br>
				<input j-model="DtoInput" j-on:keypress="SetValues(DtoInput)" value="Prueba de valor" type="text" class="m5"/>
				<br>
				<input j-on:keypress="SetValues(DtoIVacio)"  j-model="DtoIVacio"  ref="item" type="text" class="m5"/>
				<br>
				<textarea j-model="DtoTxArea" class="m5">Valor del textarea</textarea>
				<br>
				<div id="Result1" class="cR m5">
				</div>
			</div>
			<div class="p10">
				<div><b>Checks:</b></div>
				<input j-model="Dtocheck1" id="Chk1" type="checkbox" j-on:click="GetCheks" true-value="Si" false-value="No"/>
				<label for="Chk1">Sí / No</label>
				<br>
				<input j-model="Dtocheck2" j-on:click="GetCheks" id="Chk2" type="checkbox" />
				<label for="Chk2">true / false</label>

				<div id="Result2" class="cR m5">
				</div>
			</div>
			<div class="p10">
				<div><b>Check en Array:</b></div>
				<input j-model="Names" j-on:click="GetCheks" id="Chk3" type="checkbox" value="Jhon" />
				<label for="Chk3">Jhon</label>
				<br>
				<input j-model="Names" j-on:click="GetCheks" id="Chk4" type="checkbox" value="Jane" />
				<label for="Chk4">Jane</label>
				<br>
				<input j-model="Names" j-on:click="GetCheks" id="Chk5" type="checkbox" value="Doe" />
				<label for="Chk5">Doe</label>

				<div id="Result3" class="cR m5">
				</div>
			</div>

			<div j-on:click="MetodoDePrueba(12, 1500600, false, null)" id="React" ref="item2" role="10" class="bt">
				Método de prueba
			</div>

			<div id="Result4" class="cR m5">
			</div>
		</div>
	</div>


<!-- CASO DE USO: -->
<script src='JVE_v01.min.js'></script>
<script type="text/javascript">
	var jm = new JVE({
		el: '#root',
		data: {
			Prueba: 'Anderson Campos',
			Names: []
		},
		methods: {

			MetodoDePrueba: function (a, b, c, d) {
				console.log('Parámetros de este método: ');
				console.log('Parámetro "a": '+ a +', Tipo: '+ typeof a);
				console.log('Parámetro "b": '+ b +', Tipo: '+ typeof b);
				console.log('Parámetro "c": '+ c +', Tipo: '+ typeof c);
				console.log('Parámetro "d": '+ d +', Tipo: '+ typeof d);

				console.log('this.Prueba: '+this.Prueba);
				//this.Prueba = 'Mr. Anderson'
				
				this.PrintHello();
			},

			PrintHello: function() {
				console.log('¡Hello word!');
				console.log(this.Prueba);

				// Usar métodos de Jequery con refs:
				this.refs['item'].val('Hello Word');
				this.refs.item2.attr('role', 12);

			},

			SetValues: function(val){
				if(val)	this.Prueba = this[val];
				$('#Result1').text(this.Prueba);
			},
			GetCheks: function(){
				$('#Result2').html(this.Dtocheck1+'<br>'+this.Dtocheck2);
				$('#Result3').html(this.Names);
			},

			Test: function() {
				console.log(JSON.stringify(this.Prueba));
				console.log(JSON.stringify(this.Dtocheck1));
				console.log(JSON.stringify(this.Dtocheck2));
				console.log(JSON.stringify(this.Names));
			}
		},
		Ready: function() {
			console.log('Ready');
			console.log(this.Prueba);
		}
	})

</script>
<style>
	.BackForm{ background: #ddd; padding: 10px; margin: auto; border-radius: 5px; width: 80%; }
	input, .tx { padding: 5px; border: 1px solid #a0a0a0; border-radius: 3px; background: #fff; }
	.p10{ padding: 10px; }
	.p5{ padding: 5px; }
	.m5{ margin: 5px; }
	.cR{ background: #eee; height: 30px; }
	.bt{ padding: 10px; background: #36ad5c; cursor: pointer; text-align: center;  }
</style>
</body>
</html>
```





