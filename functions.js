async function getUsuarios(){
    try {
        let resp = await fetch("controllers/personas.php?op=listarUsuarios");
        json = await resp.json();
        if (json.status){
            

        }
    } catch (error) {
        console.log("Ocurrio un error:" +error);
    }
}
if(document.querySelector("#tblUsers")){
    getUsuarios();
}


$('#submit').on("click", function(){
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;
    const estado = document.getElementById('estado').value;
    const sueldo = document.getElementById('sueldo').value;

    var params = {
        'nombre': nombre,
        'apellido': apellido,
        'edad': edad,
        'sexo': sexo,
        'estado': estado,
        'sueldo': sueldo
    };
    
    $.ajax({
        type: "post",
        url: "controlador/empleados.php",
        data: params,
        dataType: 'json',
        success: function (response) {
            let data = response['0'];
            data.forEach((item) => {
                let newtr = document.createElement("tr");
                newtr.id = "row_"+item.idPersona;
                const filas = 
                newtr.innerHTML= `<tr>
                                    <td>${item.nombre}</td>
                                    <td>${item.apellido}</td>
                                    <td>${item.edad}</td>
                                    <td>${item.estado}</td>
                                    <td>${item.sexo}</td>
                                    <td>${item.sueldo}</td>
                                  </tr>`;    
                document.querySelector("#tbl-empleados").appendChild(newtr);
            });


            $('#mujeres').text(response['1']);
            $('#hombres').text(response['2'])
            $('#viudas').text(response['3']);
            $('#promedio').text(response['4']);

            $("#success").modal("show");

            $('#nombre').val('');
            $('#apellido').val('');
            $('#edad').val('');
            $('#sexo').val('');
            $('#estado').val('');
            $('#sueldo').val('');

        }
    });
    
});