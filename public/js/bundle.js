var order = {
    foods: [],
    bartendersName: "",
    costumersName: ""
};
$(document).ready(function () {
    listFoods();
    listDrinks();
    addForm();
});

function listFoods() {

    var table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-bordered');
    table.classList.add('table-striped');

    var thead = document.createElement('thead');
    var header = document.createElement('tr');

    var hfood = document.createElement('th');
    hfood.append('Foods');

    var hname = document.createElement('th');
    hname.append("Name");

    var hprice = document.createElement('th');
    hprice.append("Price(HUF)");

    var hingr = document.createElement('th');
    hingr.append("Ingredients");

    header.appendChild(hfood);
    header.appendChild(hname);
    header.appendChild(hingr);
    header.appendChild(hprice);
    thead.appendChild(header);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    $.get('/listFoods', function (data) {
        data.forEach(function (elem) {
            var row = document.createElement('tr');

            var name = document.createElement('td');
            name.append(elem.name);

            var price = document.createElement('td');
            price.append(elem.price);

            var ingredients = document.createElement('td');

            for (var i = 0; i < elem.ingredients.length; i++) {
                ingredients.append(elem.ingredients[i]);
                if (i !== elem.ingredients.length - 1) {
                    ingredients.append(", ");
                }
            }

            var cb = document.createElement('td');
            var element = document.createElement('input');
            element.type = "checkbox";
            element.className = "box";
            element.name = elem.name;
            element.value = elem.price;
            cb.append(element);

            row.appendChild(cb);
            row.appendChild(name);
            row.appendChild(ingredients);
            row.appendChild(price);
            tbody.appendChild(row);
        });
    });

    table.appendChild(tbody);

    $('#ListFoods').append(table);

}



function listDrinks() {

    var table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-bordered');
    table.classList.add('table-striped');

    var thead = document.createElement('thead');
    var header = document.createElement('tr');



    var hdrink = document.createElement('th');
    hdrink.append('Drinks');

    var hname = document.createElement('th');
    hname.append("Name");

    var hprice = document.createElement('th');
    hprice.append("Price(HUF)");

    var hsize = document.createElement('th');
    hsize.append("Size");

    header.appendChild(hdrink);
    header.appendChild(hname);
    header.appendChild(hsize);
    header.appendChild(hprice);
    thead.appendChild(header);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');



    $.get('/listDrinks', function (data) {
        data.forEach(function (elem) {
            var row = document.createElement('tr');

            var name = document.createElement('td');
            name.append(elem.name);

            var price = document.createElement('td');
            price.append(elem.price);

            var size = document.createElement('td');
            for (var i = 0; i < elem.ingredients.length; i++) {
                size.append(elem.ingredients[i]);
                if (i !== elem.ingredients.length - 1) {
                    size.append(", ");
                }
            }

            var cb = document.createElement('td');
            var element = document.createElement('input');
            element.type = "checkbox";
            element.className = "box";
            element.name = elem.name;
            element.value = elem.price;
            cb.append(element);

            row.appendChild(cb);
            row.appendChild(name);
            row.appendChild(size);
            row.appendChild(price);
            tbody.appendChild(row);
        });

    });

    table.appendChild(tbody);

    $('#ListDrinks').append(table);

}






function sendOrder() {

    var j = 0;
    var elements = document.getElementsByClassName('box');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            console.log('log: ' + elements[i].name + "  " + elements[i].value);
            order.foods[j] = {name: elements[i].name.toString(), price: Number(elements[i].value)};
            j++;
        }
    }
    console.log(order);


    var form = $("form").serializeArray();
    console.log(form);
    var costumersName = form[0].value + " " + form[1].value;
    var address = form[2].value + " " + form[3].value + " " + form[4].value;

    $.ajax({
        type: "POST",
        url: "/costumer/add",
        dataType: 'json',
        data: {name: costumersName, billing_address: address},
    },
    $.get('/bartender/rnd', function (data) {
        order.bartendersName = data.name;
        order.costumersName = costumersName;
        $.ajax({
            type: "POST",
            url: "/costumer/orderFood",
            dataType: 'json',
            data: order,
        });
    }));



    alert("Your order is successfully registered!");
}

function addForm() {


    $('#makeOrder').html('<form>\n' +
        '    <strong>Just one more step to finish your order</strong><br>\n' +
        '    <input type="text" name="fname" placeholder="First name"><br>\n' +
        '    <input type="text" name="lname" placeholder="Last name"><br>\n' +
        '    <input type="text" name="city" placeholder="City"><br>\n' +
        '    <input type="text" name="address" placeholder="Address"><br>\n' +
        '    <input type="text" name="house" placeholder="House Number"><br>\n' +
        '    </form>\n' +
        '    <button onclick="sendOrder()">submit</button>');
}