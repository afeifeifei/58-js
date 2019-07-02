//生成125个li
(function(){

    let [x,y,z] = [5,5,5]
        ,num = x*y*z;

    let html = "";
    let oUl = document.querySelector("#main ul.list");
    for(let i = 0; i < num; i++) {

        let x = i%25%5;
        let y = Math.floor(i%25/5);
        let z = Math.floor(i/25);

        let trX = (x-2)*260;
        let trY = (y-2)*240;
        let trZ = (2-z)*800;


        html += `<li style="transform:translate3D(${trX}px,${trY}px,${trZ}px)">
            <p class="title">Css3</p>
            <p class="author">阿飞</p>
            <p class="time">2019-07-01</p>
        </li>`;
    }
    oUl.innerHTML = html;

})();