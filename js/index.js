(function () {
    const container = document.getElementById("container");
    const txtInput = document.getElementById("txtInput");
    const btnAdd = document.getElementById("btnAdd");

    function createListItem(text) {
        const row = document.createElement("div");
        row.className = "list-item";

        const label = document.createElement("span");
        label.className = "item-text";
        label.textContent = text;

        const del = document.createElement("button");
        del.type = "button";
        del.className = "btn-item-delete";
        del.textContent = "X";
        del.setAttribute("aria-label", "Delete");
        del.addEventListener("click", function () {
            row.remove();
        });

        row.appendChild(label);
        row.appendChild(del);
        return row;
    }

    function addItem() {
        const value = txtInput.value.trim();
        if (value === "") {
            alert("내용을 입력하세요.");
            txtInput.focus();
            return;
        }
        container.appendChild(createListItem(value));
        txtInput.value = "";
        txtInput.focus();
    }

    btnAdd.addEventListener("click", addItem);

    txtInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            addItem();
        }
    });
})();
