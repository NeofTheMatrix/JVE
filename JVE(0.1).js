/* JVE: Jquery Vue Emulator 0.1
 * By: Anderson J. Campos R.
 * Pequeña Plugin que utiliza métodos de JQuery para emular la definición de la directiva "v-model", los métodos y los refs de Vue.js.
*/
function JVE(Entry){

	var Objs = {}, refs = {}
		_envs = 'click, focus, focusout, change', // <- Eventos para binding 
		Ts = this; // <- self

	// Recorrer Elementos del $el
	$(Entry.el).find("*").each(function(i) { // Por cada elemento:
		var t = $(this), Dlatb = [];

		$.each(this.attributes, function(i, elem) { // Buscar cada atributo de este elemento:
			if(this.specified) {

				var Md = t.attr(this.name);
			 	if(this.name == 'j-model'){ // Si es una directiva j-model:

						Objxtn(Objs, Md); // <- Crear objeto de elementos HTML
						Objs[Md] = t; // Insertar en el arreglo de elementos
						// Crear propiedad en data:
						var	NPro = Objxtn(Entry.data, Md);
						// Detectar tipo de elemento:
						if ( t.prop("tagName").toLowerCase() == 'input' ) {
							var Tp = t.attr('type');
							if(Tp == 'checkbox') {
								if(!NPro) // Si la propiedad está pre-creada en data
									SetCheck(t,Md,true);
								else
									SetCheck(t,Md);

							}else if(Tp == 'radio') {
								if(!NPro) // Si la propiedad está pre-creada en data
									t.val(Entry.data[Md])
								else
									Entry.data[Md] = t.val();

								bndg.call(t, function () {
									Ts[Md] = t.attr('value')
								})
							}else{
								if(!NPro) // Si la propiedad está pre-creada en data
									t.val(Entry.data[Md]) || t.html(Entry.data[Md]) // <- Igualar este elemento al valor de la propiedad:
								
								else	// Igualar esta propiedad al valor del elemento:
									Entry.data[Md] = t.html() || t.val()

								Txt(t,Md);
									
							}
						}

						Dlatb.push('j-model') // <- Agregar a los atributos a eliminar

			 	}else if (this.name.indexOf('j-on:') == 0) {//if(this.name.substr(0,5) == 'j-on:'){ // Si es un evento:
					try {
						  
				 		var Event = this.name.split(':'), // Obtener nombre del evento
				 			Method =  Md.split('('),//this.value.split('('),
				 			Name_Method = Method[0],
				 			Args;
				 			
						if (typeof Method[1] != 'undefined') {
							Args = Method[1].split(')')[0];
							Args = Args.split(','); // << -- Solo acepta parámetros del tipo String, number, boolean, null
							
							// Convertir parámetros:
							for (var i = 0, ln = Args.length; i < ln; i++)
								Args[i] = ParsrsVls(Args[i]);
						
						}
				 		
						// Acciones del evento:
						t.on(Event[1], function(){
							try{
								// Si es un método, se ejecuta pasándole el arreglo de parámetros:
								Ts[Name_Method].apply(Ts, Args)
							}catch(e){
								console.error('JVE: Possibly an undefined method')
								console.error(e.message)
							}
							
						})

						Dlatb.push(this.name) // <- Agregar a los atributos a eliminar
					}catch(e){ console.error(e) }
			 	} else if(this.name == 'ref') { // Si es un ref:
			 		try{
			 			Objxtn(refs, Md);
						refs[Md] = t;

						Dlatb.push('ref') // <- Agregar a los atributos a eliminar
			 		}catch(e){ console.error(e) }
			 	}
			}
		});

		// Eliminar atributos JVE del elemento:
		for (var i = 0, ln = Dlatb.length; i < ln; i++) t.removeAttr(Dlatb[i])
		
	});

// --------------------------------------------------------------
	// Elementos:
	Ts.Objs = Objs;
	// Referencias:
	Ts.refs = refs;
	// Propiedades data:
	Ts.data = Entry.data;


	// This:
	for (var e in Ts.data) Ts[e] = Ts.data[e];
	for (var e in Entry.methods) Ts[e] = Entry.methods[e];


	function bndg(fn,ev) {
		this.on((!ev)?_envs:ev, function() {
			//data = v
			fn()
		});
	}

	// Form Elements Actions:
	function SetCheck(t,Md,tp){
		var T = t.attr('true-value'), F = t.attr('false-value')
		if(!tp){
			if (T && F) {
				(t.is(":checked"))? Entry.data[Md] = T : Entry.data[Md] = F;
				bndg.call(t, function() {
					(t.is(":checked"))? Ts[Md] = T : Ts[Md] = F;
				})
			}else{
				(t.is(":checked"))? Entry.data[Md] = true : Entry.data[Md] = false;
				bndg.call(t, function() {
					(t.is(":checked"))? Ts[Md] = true : Ts[Md] = false;
				})
			}
			t.removeAttr('true-value,false-value')
		} else {
			
			if (typeof Entry.data[Md] == 'object') {
				if(t.is(":checked"))
					Entry.data[Md].push(t.val())
			} else {
				if(t.is(":checked"))
					t.val(Entry.data[Md])
			}
			
			bndg.call(t, function () {
				if (t.is(":checked")) {
					Ts[Md].push(t.val());
				} else {
					for (var i = 0, ln = Ts[Md].length; i < ln; i++) {
						if( Ts[Md][i] == t.attr('value') )
							Ts[Md].splice(i, 1);
					}
				}
			})
		}

	}

	function Txt(t,Md){
		bndg.call(t, function(){
			Ts[Md] = t.html() || t.val()
		},'keydown')
	}

	Entry.Ready.apply(Ts);

}


// ------ Private:

// Crear propiedad en Objecto dinámicamente ([Objeto], [Nombre de la nueva propiedad]):
function Objxtn(Obj, xtn) {
    if (typeof Obj[xtn] == 'undefined') { //Crear una propiedad si no existe
        Obj[xtn] = {};
        Obj = Obj[xtn];
    }else
    	Obj = false

return Obj;
}

// Convertir valores:
function ParsrsVls(v){
	v = v.trim();
	if(typeof v == 'string'){
		if(!isNaN(v)) { // Si es un número:
			v = parseFloat(v)
		}else{
			// Cualquier otro valor, evaluar:
			if(v == "true") v = true; else
				if(v == "false") v = false; else
					if(v == "null") v = null;
		}
	}

return v
}
