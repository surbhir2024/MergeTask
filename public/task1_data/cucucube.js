var score = 1;
    function randomcell() {
        let tdque = document.querySelectorAll('td');
        let RanCell = Math.floor(Math.random() * tdque.length);

        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        document.querySelectorAll('td').forEach(cell => {
            cell.style.opacity = 1;
            cell.style.background = color;
        });
        tdque[RanCell].style.opacity = 0.5;
        tdque[RanCell].setAttribute("onclick", " AddColumnrow()");


    }

    function AddColumnrow() {
        let table = document.getElementById('tableid');
        if (table.rows.length < 12) {

            document.querySelectorAll('tr').forEach(row => {
                let cell = document.createElement('td');
                row.appendChild(cell);
            });



            let length = table.rows[0].cells.length;
            let row = document.createElement("tr");

            for (let i = 0; i < length; i++) {

                var cell = document.createElement('td');
                row.appendChild(cell);
            }
            table.appendChild(row);

        }

        document.getElementById('text').innerHTML = "Your Score is" + score;
        score++;
        randomcell();

    }

    let count = 60;
    const timer = setInterval(function () {
        count--;
        if (count === 0) {
            clearInterval(timer);
            alert("Time's up!");
            score = 0;
        }
    }, 200);