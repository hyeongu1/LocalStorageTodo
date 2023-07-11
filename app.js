const form = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");
const searchResults = document.querySelector("#searchResults");

// 페이지 로드 시 저장된 데이터 표시
window.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("searchData");
    if (savedData) {
        const searchData = JSON.parse(savedData);
        searchData.forEach((item) => {
            createListItem(item);
        });
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = searchInput.value.trim();
    if (inputValue !== "") {
        createListItem(inputValue);
        searchInput.value = "";

        // 로컬 스토리지에 데이터 저장
        const savedData = localStorage.getItem("searchData");
        let searchData = [];
        if (savedData) {
            searchData = JSON.parse(savedData);
        }
        searchData.push(inputValue);
        localStorage.setItem("searchData", JSON.stringify(searchData));
    }
});

// 리스트 아이템 생성
function createListItem(text) {
    const listItem = document.createElement("li");
    listItem.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
        listItem.remove();

        // 로컬 스토리지에서 데이터 제거
        const savedData = localStorage.getItem("searchData");
        let searchData = [];
        if (savedData) {
            searchData = JSON.parse(savedData);
            searchData = searchData.filter((item) => item !== text);
            localStorage.setItem("searchData", JSON.stringify(searchData));
        }
    });

    listItem.appendChild(deleteButton);
    searchResults.appendChild(listItem);
}
