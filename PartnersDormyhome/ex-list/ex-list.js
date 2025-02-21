function deleteRoom() {
    const mainBox = document.querySelector('.main');
    const area = document.querySelector('.main');


    mainBox.style.display = 'none';
    area.style.display = 'block';

    area.innerHTML = `
        <div class="title">ประเภทห้องพัก</div>
        <div class="area">
            <p>การลบห้องพักเสร็จสมบูรณ์</p>
            <p>ระบบได้อัปเดตรายการห้องพักเรียบร้อยแล้ว</p> 
            <p>และข้อมูลทั้งหมดที่เกี่ยวข้องกับห้องพักนี้ถูกนำออกจากระบบ</p>
            <button class="addroom">เพิ่มห้องพัก</button>
        </div>
    `;

    document.querySelector('.addroom').addEventListener('click', addRoom);
}

function addRoom() {
    const area = document.querySelector('.area');
    const mainBox = document.querySelector('.main');


    area.style.display = 'none';
    mainBox.style.display = 'block';

    area.innerHTML = '';
    location.reload();
}

document.querySelector('.delete-btn').addEventListener('click', deleteRoom);