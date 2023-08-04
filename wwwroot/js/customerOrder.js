$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = ''; var i = 1; var totalSum = 0;
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td class="text-bright-blue">' + (i++).toString() + '</td>';
                html += '<td class="text-bright-blue">' + item.customerOrderId + '</td>';
                html += '<td class="text-bright-blue">' + item.number + '</td>';
                html += '<td class="text-bright-blue">' + item.date + '</td>';
                html += '<td class="text-bright-blue">' + item.customerId + '</td>';
                html += '<td class="text-bright-blue">' + item.status + '</td>';
                html += '<td class="text-bright-blue">' + (new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })).format(item.totalPrice) + '</td>';
                html += '<td><a class="crud-command" href="#" onclick="return getbyID(\'' + item.customerOrderId + '\')">Редактировать</a><br><br> <a class="crud-command" href="#" onclick="deleteOrder(\'' + item.customerOrderId + '\')">Удалить</a></td>';
                html += '</tr>';
                totalSum += item.totalPrice;
            });
            $('.tbody').html(html);

            html = `'<tr><td colspan="8">Итого заказов: ${--i}</td> </tr>'`;
            html += `'<tr><td colspan="8">Сумма всех заказов: ${(new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })).format(totalSum)}</td></tr>'`;
            $('.tfoot').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function clearTextBox() {
    $('#CustomerOrderId').val("");
    $('#Number').val("1");
    $('#Date').val("40");
    $('#CustomerId').val("3");
    $('#Status').val("3");
    $('#TotalPrice').val("3");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#CustomerOrderId').css('border-color', 'lightgrey');
    $('#Number').css('border-color', 'lightgrey');
    $('#Level').css('border-color', 'lightgrey');
    $('#Date').css('border-color', 'lightgrey');
    $('.msg-error').html('');
    $('.msg-error').hide();
}

function addOrder() {
    debugger;
    //var res = validate();
    var res = true;
    if (res == false) {
        return false;
    }
    var customerOrderObj = {
        CustomerOrderId: $('#CustomerOrderId').val(),  
        Number: $('#Number').val(),
        /*Date: $('#Date').val(),*/
        CustomerId: $('#CustomerId').val(),
        Status: $('#Status').val(),
        TotalPrice: $('#TotalPrice').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(customerOrderObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function validate() {
    var isValid = true;
    if ($('Number').val().trim() == "") {
        $('#Number').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Number').css('border-color', 'lightgrey');
    }
    if ($('#Date').val().trim() == "") {
        $('#Date').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Date').css('border-color', 'lightgrey');
    }
    if ($('#CustomerId').val().trim() == "") {
        $('#CustomerId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomerId').css('border-color', 'lightgrey');
    }
    if ($('#Status').val().trim() == "") {
        $('#Status').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Status').css('border-color', 'lightgrey');
    }
    if ($('#TotalPrice').val().trim() == "") {
        $('#TotalPrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TotalPrice').css('border-color', 'lightgrey');
    }

    return isValid;
}

function deleteOrder(id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function getbyID(customerOrderID) {
    $('#CustomerOrderId').css('border-color', 'lightgrey');
    $('#Number').css('border-color', 'lightgrey');
    $('#Date').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
    $('#TotalPrice').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/GetByID/" + customerOrderID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#CustomerOrderId').val(result.customerOrderId);
            $('#Number').val(result.number);
           /* $('#Date').val(result.date);*/
            $('#CustomerId').val(result.customerId);
           /* $('#Status').val(result.status);*/
            $('#TotalPrice').val(result.totalPrice);
            $('.msg-error').html('');
            $('.msg-error').hide();

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function updateOrder() {
    //var res = validate();
    var res = true;
    if (res == false) {
        return false;
    }
    var customerOrderObj = {
        CustomerOrderId: $('#CustomerOrderId').val(),
        Number: $('#Number').val(),
        /*Date: $('#Date').val(),*/
        CustomerId: $('#CustomerId').val(),
        /*Status: $('#Status').val(),*/
        TotalPrice: $('#TotalPrice').val()
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(customerOrderObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#CustomerOrderId').val("");
            $('#Number').val("-1");
            $('#Date').val("");
            $('#CustomerId').val("");
            $('#Status').val("");
            $('#TotalPrice').val("");
            $('.msg-error').html('');
            $('.msg-error').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}