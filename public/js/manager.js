



$(document).ready(function () {
    chart();
    listOpenOrders();
    money();
});


function chart() {
    var times = [];
    var bartenders = [];
    $.ajax({
        type: "GET",
        url: "/bartender/getBartenders",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(element){

            element.forEach(function (item) {
                bartenders.push(item.name);
            });
            console.log(bartenders);
            $.ajax({
                type: "GET",
                url: "/order/listOrders",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){

                    bartenders.forEach(function (bar) {
                        time = 0;
                        data.forEach(function (item) {
                            if(item.bartendersName == bar)
                                time++;
                        })
                        times.push(time);
                    })

                    var prdata = {
                        labels: bartenders,
                        datasets: [{
                            label: "Statistics of Orders",
                            data: times,
                            backgroundColor: ["turquise", "orange", "yellow"]
                        }]
                    };
                    var ctx = document.getElementById("content").getContext("2d");
                    new Chart(ctx, {
                        type: 'doughnut',
                        data: prdata,
                        options: {},
                        responsive: true,
                        maintainAspectRatio: true
                    });

                },
                failure: function(errMsg) {
                    alert(errMsg);
                }});

        },
        failure: function(errMsg) {
            alert(errMsg);
        }});
}


function listOpenOrders() {
    var table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-bordered');
    table.classList.add('table-striped');

    var thead = document.createElement('thead');
    var header = document.createElement('tr');

    var hfulfill = document.createElement('th');
    hfulfill.append('Fulfill');

    var hname = document.createElement('th');
    hname.append("Name");


    var horder = document.createElement('th');
    horder.append("Ordered");

    var hprice = document.createElement('th');
    hprice.append("Price(HUF)");


    header.appendChild(hfulfill);
    header.appendChild(hname);
    header.appendChild(horder);
    header.appendChild(hprice);
    thead.appendChild(header);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    $.get('/order/listOrders', function (data) {
        data.forEach(function (elem) {
            if(elem.fulfilled == false){

                var row = document.createElement('tr');

                var name = document.createElement('td');
                name.append(elem.costumersName);

                var foods = document.createElement('td');
                var orderedfoods = "";
                elem.foods.forEach(function (food) {
                    orderedfoods += food.name + ", ";
                })
                orderedfoods = orderedfoods.slice(0,-2);
                foods.append(orderedfoods);

                var price = document.createElement('td');
                price.append(elem.totalCost);


                var cb = document.createElement('td');
                var element = document.createElement('input');
                element.type = "checkbox";
                element.className = "box";
                element.name = elem.name;
                element.value = elem.price;
                element.id = elem._id;
                cb.append(element);

                row.appendChild(cb);
                row.appendChild(name);
                row.appendChild(foods);
                row.appendChild(price);
                tbody.appendChild(row);
            }
        });
    });
    table.appendChild(tbody);


    $('#open').append(table);
    $('#button').html('<button onclick="fulfill()">fulfill</button>')

}


function fulfill() {

    var j = 0;
    var elements = document.getElementsByClassName('box');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            $.ajax({
                type: "POST",
                url: "/order/fulfillOrder",
                dataType: 'json',
                data: {id: elements[i].id}
            });

            j++;
        }
    }
    alert("The orders are succesfully fulfilled!");
    location.reload();
}


function money() {
    var cash = 0;
    $.ajax({
        type: "GET",
        url: "/order/listOrders",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(element){
            element.forEach(function (order) {

              if(order.fulfilled == true){
                  cash += order.totalCost;
              }
            })
            $('#cash').html(cash + " Ft")
               },
        failure: function(errMsg) {
            alert(errMsg);
        }});
}