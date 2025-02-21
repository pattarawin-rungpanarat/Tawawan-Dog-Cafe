document.addEventListener('DOMContentLoaded', function () {
    const plusListButton = document.querySelector('.pluslist');
    const roomListContainer = document.getElementById('room-list-container');

    plusListButton.addEventListener('click', function () {

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'กรอกประเภทห้องพักใหม่';
        inputField.style.marginRight = '10px';
        inputField.style.paddingLeft = '10px';

        const submitButton = document.createElement('button');
        submitButton.innerHTML = '<i class="bx bx-check"></i>ยืนยัน';
        submitButton.style.backgroundColor = '#20B2AA';
        submitButton.style.color = '#ffffff';
        submitButton.style.borderRadius = '5px';
        submitButton.style.padding = '8px 20px';
        submitButton.style.border = 'none';
        submitButton.style.fontSize = '18px';
        submitButton.style.cursor = 'pointer';

        const inputContainer = document.createElement('div');
        inputContainer.style.marginTop = '10px';
        inputContainer.appendChild(inputField);
        inputContainer.appendChild(submitButton);

        roomListContainer.appendChild(inputContainer);

        submitButton.addEventListener('click', function () {
            const newRoomType = inputField.value.trim();
            if (newRoomType) {

                const newRoomLink = document.createElement('a');
                newRoomLink.href = '../ex-list/ex-list.html';
                newRoomLink.style.textDecoration = 'none';

                const newRoomButton = document.createElement('button');
                newRoomButton.className = 'list-bnt';
                newRoomButton.innerHTML = `${newRoomType}<i class='bx bx-caret-right'></i>`;
                newRoomButton.style.marginTop = '10px';

                newRoomLink.appendChild(newRoomButton);
                roomListContainer.appendChild(newRoomLink);
                roomListContainer.removeChild(inputContainer);
            } else {
                alert('กรุณากรอกประเภทห้องพัก');
            }
        });
    });
});