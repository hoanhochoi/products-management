// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]") 
// lưu ý : thuộc tính tự định nghĩa thêm dấu ngoặc []
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    // console.log(path)
    // console.log(formChangeStatus);


    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
        const statusCurrent = button.getAttribute("data-status")
        let statusChange = statusCurrent == "active" ? "inactive":"active";
       
        const id = button.getAttribute("data-id")
        const action = path+`/${statusChange}/${id}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit();            
        })

    })
}

// end change status
// button status

const buttonStatus = document.querySelectorAll("[button-status]") // những thuộc tính tự định nghĩa thêm ngoặc vuông vào
if (buttonStatus.length > 0) // kiểm tra sự trong mảng có thì mới chạy k thì thôi đỡ mất thời gian
{
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            if (status) {
                url.searchParams.set("status", status)
            }
            else {
                url.searchParams.delete("status")
            }
            console.log(url.href);
            window.location.href = url.href // chuyển hướng trang web thành đường dẫn khác
        })
    })

}

// end status


// form search
const formSearch = document.querySelector("#form-search")
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // để ngăn sự mặc định
        console.log(e.target.elements.keyword.value)

        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href
    })
}
// end form search


// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if (buttonPagination) {
    let url = new URL(window.location.href)
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page);
            window.location.href = url.href;

        });
    })

}

// end pagination


// checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name=checkall]")
    const inputsId = checkboxMulti.querySelectorAll("input[name=id]");
    inputCheckAll.addEventListener("click", () => {
        // console.log(inputCheckAll.checked);

        // checked để biết đã kích trả true
        if (inputCheckAll.checked == true) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })
    inputsId.forEach(input => {

        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked").length;

            // đoạn querySelectorAll("input[name=id]:checked") 
            // hiểu là selector css lấy ra nhưng thằng input có name là id và đã được tích = true
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else inputCheckAll.checked = false;

        })

    })


}
// end checkbox Multi


// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();// để ngăn hành động mặc định
        const checkboxMulti = document.querySelectorAll("[checkbox-multi]");
        const inputsChecked = document.querySelectorAll("input[name='id']:checked")
        // console.log(inputsChecked)

        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isconfirm = confirm("bạn có chắc muốn xóa hết không?")
            if (!isconfirm) {
                return; // nếu chạy vào dòng tất cả dòng code ở dưới ngừng chạy
            }
        }

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    console.log(`${id}-${position}`);
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);

                }
            });
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else alert("vui lòng chọn ít nhất bản ghi")

    })
}
// End Form Change Multi

// show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time)
    console.log(showAlert);
}
// end show alert


// upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    console.log(uploadImageInput);
    console.log(uploadImagePreview);
    uploadImageInput.addEventListener("change", (e) => {
        console.log(e)
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })

}
// end upload image


// sort
const sort = document.querySelector("[sort]");
if (sort) {
    const url = new URL(window.location.href);
    console.log(url);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    // sắp xếp
    sortSelect.addEventListener("change", (e) => {
        const keyValue = e.target.value.split("-");
        const [key, value] = keyValue;
        url.searchParams.set("sortKey", key);
        url.searchParams.set("sortValue", value);
        window.location.href = url.href;

    })
    // xóa sắp xếp
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })

    // thêm selected cho option
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if (sortKey && sortValue) {
        const keyValue = `${sortKey}-${sortValue}`;
        const optionSelect = sortSelect.querySelector(`option[value=${keyValue}]`);
        // optionSelect.selected = true; câu lệnh nếu có thuộc tính đó thì dùng này
        optionSelect.setAttribute("selected", true); // còn không thì dùng như này cho mọi TH

    }
}
// end sort