$(document).ready(function () {
    chart();
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