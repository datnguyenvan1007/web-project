//alert
function notify (message, type, selection) {
    let html = `
        <div class="alert alert-dismissible message alert-${type}" role="alert">
            ${message}
        </div>
    `;
    setTimeout(function () {
        $(selection).html(html);
        $(selection).css('margin-top', '105px');
    }, 500);
    setTimeout(function () {
        $(selection).css('margin-top', '-100px')
    }, 3000);
}


// add category
var categories = [{
        id: 1,
        name: "Áo nam",
        parentId: 0
    },
    {
        id: 2,
        name: "Quần nam",
        parentId: 0
    },
    {
        id: 3,
        name: "Phụ kiện",
        parentId: 0
    },
    {
        id: 4,
        name: "Áo thun tay ngắn",
        parentId: 1
    },
    {
        id: 5,
        name: "Áo Polo",
        parentId: 1
    },
    {
        id: 6,
        name: "Quần Jean",
        parentId: 2
    },
    {
        id: 7,
        name: "Quần Jean Nam",
        parentId: 6
    },
    {
        id: 8,
        name: "Quần Âu",
        parentId: 2
    },
    {
        id: 9,
        name: "Quần Âu nam",
        parentId: 8
    },
    {
        id: 10,
        name: "Quần Âu nữ",
        parentId: 8
    },
    {
        id: 11,
        name: "Quần Âu nữ giới",
        parentId: 10
    },
    {
        id: 12,
        name: "Quần Âu nữ giới",
        parentId: 5
    },
    {
        id: 13,
        name: "Quần Âu nữ giới 1",
        parentId: 12
    },
    {
        id: 14,
        name: "Quần Âu nữ giới 2",
        parentId: 13
    }
];

function addCategory(level, categories) {
    var insertCate = ``;
    if (level == 1) {
        insertCate += `
        <tr>
            <td class="index">1</td>
            <td>
                <input type="text" name="newCategory" id="" class="form-control" placeholder="Tên danh mục">
            </td>
        </tr>   
        `;
    } else {
        for (let i = 1; i < level; i++) {
            insertCate += `
                <tr>
                    <td>${i}</td>
                    <td>
                    <select name="category${i}" id="category${i}" class="form-control">
                        <option value="0">--Chọn--</option> 
            `;
            if (i == 1) {
                for (let cate of categories) {
                    if (cate.parentId == 0) {
                        insertCate += `<option value="${cate.id}">${cate.name}</option>`;
                    }
                }
            }
        }
        insertCate += `
                    </select>
                </td>
            </tr>
            <tr>
                <td class="index">${level}</td>
                <td>
                    <input type="text" name="newCategory" id="" class="form-control" placeholder="Tên danh mục">
                </td>
            </tr>
        `;

    }
    return insertCate;
}

$('#categoryLevel').on('change', function () {
    var level = parseInt($('#categoryLevel').val());
    $('.addCategory').html(addCategory(level, categories));
    selectCate(level);
});

function select(id, categories) {
    var html = `<option value="0">--Chọn--</option> `;
    for (let cate of categories) {
        if (id == cate.parentId) {
            html += `
                <option value="${cate.id}">${cate.name}</option>
            `;
        }
    }
    return html;
}

function selectCate(level) {
    for (let i = 3; i <= level; i++) {
        $(document).on('change', `#category${i - 2}`, function () {
            var value = parseInt($(`#category${i - 2}`).val());
            if (value == 0) {
                for (let j = i - 1; j <= level; j++)
                    $(`#category${j}`).html(`<option value="0">--Chọn--</option> `);
            }
            else
                $(`#category${i - 1}`).html(select(value, categories));
        });
    };
}

// add product

function selectCategory (index, idCurrentCate, data) {
    let html = ``;
    for (let cate of data) {
        if (idCurrentCate == cate.parentId) {
            html = `
                <div class="row">
                    <div class="col-6 form-group">
                        <label for="category${index}"></label>
                        <select name="category${index}" id="category${index}" class="form-control">
                            <option value="0" checked>--Chọn--</option>
            `;
            for (let category of data) {
                if(idCurrentCate == category.parentId) {
                    html += `
                        <option value="${category.id}">${category.name}</option>
                    `;
                }
            }
            html += `
                        </select>
                    </div>
                </div>
            `;
            break;
        }
    }
    return html;
};

$(document).on('change', '#category', function () {
    $('.container-category').html('');
    let index = 1;
    let value = $('#category').val();
    value = parseInt(value);
    if(value != 0) {
        $('.container-category').append(selectCategory(1, value, categories));
        $(document).on('change', `#category${1}`, function cate () {
            let value = parseInt($(this).val());
            let element = $('.container-category .row');
            let index = 0;
            for (let i = 1; i <= element.length; i++) {
                if (element[i - 1] == $(this).closest('.row')[0]) {
                    index = i;
                    break;
                }
            }
            for (let i = index + 1; i < element.length; i++) {
                $(element[i]).remove();
            }
            if (value != 0) {
                let html = selectCategory(index + 1, value, categories);
                if(html != '') {
                    $('.container-category').append(html);
                    $(document).on('change', `#category${index + 1}`, cate);
                }
            }
        });
    };
});

$('.save').on('click', function (e) {
    e.preventDefault();
    notify("Bạn đã thêm thành công!", "success", ".notification");
});
