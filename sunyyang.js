function showHour(diff, id)
{
    let days = Math.floor(diff/(1000*60*60*24));
    let hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    let seconds = Math.floor(diff % (1000 * 60) / 1000);

    let clock = `${days}D-${hours}H-${minutes}MIN-${seconds}SEG`;
    document.getElementById(id).textContent = clock;
}

function aniversary()
{
    let now = new Date();
    let date = new Date("2025-05-07");
    let diff = date - now;

    showHour(diff, "aniversario");
}
