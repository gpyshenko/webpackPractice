const num = 5;
function click() {
    $('p').on('click', function () {
        $(this).css({ fontSize: '20px' })
    })
}

export {
    num,
    click
}