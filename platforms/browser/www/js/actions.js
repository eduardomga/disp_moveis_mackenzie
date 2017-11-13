$(document).ready(function(){
	$('#cadastrarBuraco').click(function(){
		alert('aaa');
		var aux = {
			nome_usuario : $('#nome_usuario').val(),
			localizacao : $('#localizacao').val(),
			grau_perigo : $('#grau_perigo').val()
		};
		if(aux.nome_usuario && aux.localizacao && aux.grau_perigo){
			console.log(aux);
			axios.post('http://localhost:8081/api/buracos',aux).then(function(response){
				alert('Buraco cadastrado com Sucesso !');
			}).catch(function(error){
				alert('Erro ao cadastrar Buraco !');
			});
			centraMapa();
			$('#myCadastro').modal('hide');
		}else{
			alert('Por favor preencha todos os campos !');
		}
		limpaCampos();
	});
});

function getBuracos(){
	axios.get('http://localhost:8081/api/buracos').then(function(response){

	}).catch(function(error){

	});
}

function setMarkers(map) {
	var image = {
		url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
		size: new google.maps.Size(20, 32),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(0, 32)
	};
	var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18, 1],
		type: 'poly'
	};
	for (var i = 0; i < beaches.length; i++) {
		var beach = beaches[i];
		var marker = new google.maps.Marker({
			position: {lat: beach[1], lng: beach[2]},
			map: map,
			icon: image,
			shape: shape,
			title: beach[0],
			zIndex: beach[3]
		});
	}
}

$('#limpaCampos').click(function(){
	limpaCampos();
	centraMapa();
});

function limpaCampos(){
	$('#nome_usuario').val(''),
	$('#localizacao').val(''),
	$('#localizacao_busca').val('');
}

function centraMapa(){
	map.setCenter({lat: -14.235, lng: -51.925});
	map.setZoom(17);
}

function initMap(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -14.235, lng: -51.925},
        zoom: 3
      });
      var input = document.getElementById('localizacao_busca');


      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      var infowindow = new google.maps.InfoWindow();

      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);  
        }
        marker.setIcon(({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
        document.getElementById('localizacao').value = JSON.stringify(place.geometry.location);
        console.log(JSON.stringify(place.geometry.location));
        console.log(place.geometry.location.lat);
        console.log(place.geometry.location.lng);
      });
    }