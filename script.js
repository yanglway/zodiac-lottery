
async function loadData() {
    const [current, history, zihua] = await Promise.all([
        fetch('data/current.json').then(r => r.json()),
        fetch('data/history.json').then(r => r.json()),
        fetch('data/zihua.json').then(r => r.json()),
    ]);

    const now = new Date();
    const hour = now.getHours();
    const period = now.getFullYear().toString() + (now.getMonth()+1).toString().padStart(2, '0') +
                   now.getDate().toString().padStart(2, '0') + hour.toString().padStart(2, '0');

    document.getElementById('period').textContent = period;

    const nextDraw = new Date();
    nextDraw.setMinutes(60);
    nextDraw.setSeconds(0);
    const timeDiff = nextDraw - now;
    const mins = Math.floor(timeDiff / 60000);
    const secs = Math.floor((timeDiff % 60000) / 1000);
    document.getElementById('countdown').textContent = `${mins}分${secs}秒`;

    document.getElementById('draw-time').textContent = nextDraw.toLocaleTimeString();
    document.getElementById('draw-number').textContent = current.number;
    document.getElementById('draw-word').textContent = zihua[current.number] || '未知';

    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `第${item.period}期：${item.number}（${zihua[item.number] || '未知'}）`;
        historyList.appendChild(li);
    });
}

setInterval(loadData, 1000);
loadData();
